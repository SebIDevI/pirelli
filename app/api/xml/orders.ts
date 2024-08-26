// pages/api/orders.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { generateOrderXML } from "@/server/actions/xml-generate/generate-order-xml";
import { uploadOrderXML } from "@/lib/upload-order-xml";
import { AllOrders } from "@/lib/infer-type";

const EXTERNAL_ENDPOINT_URL = "https://external-server.com/api/upload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const order: AllOrders = req.body;

      // Validate order data here if necessary

      const xmlData = generateOrderXML({ order });

      console.log(xmlData);
      //   await uploadOrderXML(xmlData, EXTERNAL_ENDPOINT_URL);

      res
        .status(200)
        .json({ message: "Order processed and XML uploaded successfully" });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
