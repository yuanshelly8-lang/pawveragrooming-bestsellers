(async () => {
  const PRODUCT_URL = "https://detail.1688.com/offer/708173468533.html";
  const csrfToken = "90776cb65b164edc95fe6f62af057828";
  try {
    // 1. Pre-check
    const preCheckRes = await fetch("https://post.alibaba.com/product/batchEasyListing/batchPreCheck.json?transType=IMAGE_TRANSLATION_MAIN_6_DETAIL_30&totalCount=1");
    const preCheck = await preCheckRes.json();
    if (!preCheck.data.checkResult) {
      window.__publish_result = { status: "failed", reason: "PRE_CHECK_FAILED", details: preCheck.data };
      return;
    }

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
    if (!startData.success) {
      window.__publish_result = { status: "failed", reason: "START_TASK_FAILED", data: startData };
      return;
    }

    // 3. Polling
    let pollData = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 10000));
      const pollRes = await fetch("https://post.alibaba.com/product/batchEasyListing/getLatestRootTaskResult.json?needSubStatus=true&scene=agentAccioWorkPublish&subScene=multiUrlProduct");
      pollData = await pollRes.json();
      if (pollData.data && (pollData.data.status === 2 || pollData.data.status === -1)) break;
    }

    if (!pollData || !pollData.data) {
      window.__publish_result = { status: "failed", reason: "POLLING_FAILED", data: pollData };
      return;
    }

    // 4. Get detail
    const detailRes = await fetch(`https://post.alibaba.com/product/batchEasyListing/pageQueryTask.json?parentId=${pollData.data.taskId}`);
    const detailData = await detailRes.json();
    window.__publish_result = { status: "completed", summary: pollData.data, detail: detailData };
  } catch (e) {
    window.__publish_result = { status: "error", message: e.message };
  }
})()
