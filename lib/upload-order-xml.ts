export async function uploadOrderXML(
  xmlData: string,
  endpointUrl: string
): Promise<void> {
  try {
    const response = await fetch("/api/xml/upload-xml", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
      },
      body: xmlData,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to upload XML to ${endpointUrl}: ${response.statusText}`
      );
    }

    console.log("XML uploaded successfully");
  } catch (err) {
    console.error("Error uploading XML:", err);
    throw err;
  }
}
