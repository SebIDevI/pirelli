import FormData from "form-data";
import fetch from "node-fetch"; // Import node-fetch

export async function uploadXml(xmlData: string) {
  try {
    // Prepare form data for the request
    const formData = new FormData();
    formData.append("xmlFile", xmlData, {
      filename: "file.xml",
      contentType: "application/xml",
    });

    // Send the file to the external server
    const response = await fetch(
      `${process.env.SERVER_LINK}:${process.env.SERVER_PORT}/upload-xml`,
      {
        method: "POST",
        headers: { "x-api-key": process.env.SERVER_SECRET_KEY! }, // Use formData.getHeaders() for the headers
        body: formData as any, // Cast body to any
      }
    );
    // Check if the response is OK
    if (!response.ok) {
      const error = await response.text(); // Get the error message
      return { error: "we not cool" + error };
    }

    // Parse the JSON response from the external server
    const result = await response.json();
    return { success: "we cool" + result };
  } catch (error) {
    console.error("Error uploading XML:", error);
    return { error: "we not cool" + error };
  }
}
