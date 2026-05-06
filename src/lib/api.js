const BASE_URL = "https://auto.dairaitgroup.com.ar/webhook";

/**
 * Generic helper to handle API requests
 * @param {string} endpoint 
 * @param {RequestInit} options 
 */
async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Sends investment data to be calculated
 * @param {Object} data 
 * @param {number} data.capital_invertido 
 * @param {number} data.plazo_en_dias 
 * @param {number} data.tna 
 */
export async function calculateInvestment(data) {
    return apiRequest("67479a90-b220-4b6a-b082-54ae3de35fe4", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * Fetches the investment history
 */
export async function fetchHistory() {
    return apiRequest("7c682683-153c-4543-87ef-bdf7b52745ee", {
        method: "GET",
    });
}
