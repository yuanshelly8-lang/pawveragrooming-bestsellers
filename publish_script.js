(async () => {
  const PRODUCT_URL = "https://detail.1688.com/offer/708173468533.html";
  try {
    let csrfToken = window.csrfToken?.tokenValue;
    if (!csrfToken) {
        // Fallback: search for it
        const match = document.documentElement.innerHTML.match(/X-XSRF-TOKEN=([a-f0-9]+)/);
        if (match) csrfToken = match[1];
    }
    if (!csrfToken) return "[Result] " + JSON.stringify({ status: "failed", reason: "CSRF Token Missing" });

    // 1. Pre-check
    const preCheckRes = await fetch("https://post.alibaba.com/product/batchEasyListing/batchPreCheck.json?transType=IMAGE_TRANSLATION_MAIN_6_DETAIL_30&totalCount=1");
    const preCheck = await preCheckRes.json();
    if (!preCheck.data.checkResult) return "[Result] " + JSON.stringify({ status: "failed", reason: "PRE_CHECK_FAILED", details: preCheck.data });

    // 2. Trigger task
    const payload = {
      jsonBody: {
        scene: "agentAccioWorkPublish",
        subScene: "multiUrlProduct",
        urlList: [PRODUCT_URL],
        imageTransType: "IMAGE_TRANSLATION_MAIN_6_DETAIL_30",
        publishCondition: { needPublish: true, qualityScore: "4.5", imgStrategy: "onlyMainExtractionStrategies" }
      }
    };

    const startRes = await fetch("https://post.alibaba.com/product/batchEasyListing/batchProductGenerateStart.json", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": csrfToken },
      body: JSON.stringify(payload)
    });
    const startData = await startRes.json();
    if (!startData.success) return "[Result] " + JSON.stringify({ status: "failed", reason: "START_TASK_FAILED", data: startData });

    // 3. Polling (Status 2=Success, -1=Failed)
    let pollData = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 10000));
      const pollRes = await fetch("https://post.alibaba.com/product/batchEasyListing/getLatestRootTaskResult.json?needSubStatus=true&scene=agentAccioWorkPublish&subScene=multiUrlProduct");
      pollData = await pollRes.json();
      if (pollData.data.status === 2 || pollData.data.status === -1) break;
    }

    // 4. Get detail
    const detailRes = await fetch(`https://post.alibaba.com/product/batchEasyListing/pageQueryTask.json?parentId=${pollData.data.taskId}`);
    const detailData = await detailRes.json();
    return "[Result] " + JSON.stringify({ status: "completed", summary: pollData.data, detail: detailData });
  } catch (e) { return "[Result] " + JSON.stringify({ status: "error", message: e.message }); }
})()
