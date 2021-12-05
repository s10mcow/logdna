export const testAlert = async (payload) => {
  try {
    const response = await fetch("/.netlify/functions/test-alert", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return response.json();
  } catch (e) {
    return console.log(e);
  }
};
export const saveRecipient = async (payload) => {
  try {
    const response = await fetch("/.netlify/functions/save-recipient", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return response.json();
  } catch (e) {
    return console.log(e);
  }
};
