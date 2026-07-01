(async () => {
  try {
    const response = await fetch('https://crm.alibaba.com/crmlogin/aisales/dingwukong/diagnoseData.json', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await response.json();
    return { __result: data };
  } catch (error) {
    return { __result: { error: error.message } };
  }
})();