import { parse } from "js2xmlparser";
import { AllOrders, TotalOrders } from "@/lib/infer-type";

type ArticleType = {
  ArticleIdentification: {
    SuppliersArticleID: string;
    EANUCCArticleID: string;
  };
  ArticleDescription: {
    ArticleDescriptionText: string;
  };
  InvoiceQuantity: {
    QuantityValue: number;
    MeasureUnitCode: string;
  };
  PriceDetails: {
    GrossUnitPrice: {
      PriceAmount: number;
    };
    NetUnitPrice: {
      PriceAmount: number;
    };
  };
  TaxDetails: {
    TaxTypeCode: string;
  };
  AllowanceOrCharge: {
    OtherChargeTypeCode: string;
    AllowanceOrChargeName: string;
    AllowanceOrChargeAmount: {
      AmountValue: number;
    };
  }[];
  Consignee: {
    PartyID: string;
    AgencyCode: number;
    Name: string;
    Address: {
      Street: string;
      City: string;
      District: string;
      PostCode: string;
      CountryCode: string;
    };
  };
  OrderingParty: {
    PartyID: string;
    AgencyCode: number;
  };
};

export function generateOrderXML({ order }: { order: AllOrders }) {
  let totalAmountValue = 0;
  order.orderProduct.map((op) => {
    totalAmountValue += parseFloat(
      (((op.productVariants.price * 100) / 119) * op.quantity).toFixed(2)
    );
  });
  let Article: ArticleType[] = [];
  order.orderProduct.map((op) =>
    Article.push({
      ArticleIdentification: {
        SuppliersArticleID: op.productVariants.pirelliId,
        EANUCCArticleID: op.productVariants.ean,
      },
      ArticleDescription: {
        ArticleDescriptionText: op.productVariants.fullSize,
      },
      InvoiceQuantity: {
        QuantityValue: op.quantity,
        MeasureUnitCode: "PCE",
      },
      PriceDetails: {
        GrossUnitPrice: {
          PriceAmount: parseFloat(
            ((op.productVariants.price * 100) / 119).toFixed(2)
          ),
        },
        NetUnitPrice: {
          PriceAmount: parseFloat(
            ((op.productVariants.price * 100) / 119).toFixed(2)
          ),
        },
      },
      TaxDetails: {
        TaxTypeCode: "VAT",
      },
      AllowanceOrCharge: [
        {
          OtherChargeTypeCode: "+",
          AllowanceOrChargeName: "Official list price",
          AllowanceOrChargeAmount: {
            AmountValue: totalAmountValue,
          },
        },
        {
          OtherChargeTypeCode: "+",
          AllowanceOrChargeName: "Gross Value",
          AllowanceOrChargeAmount: {
            AmountValue: totalAmountValue,
          },
        },
      ],
      Consignee: {
        PartyID: "",
        AgencyCode: 91,
        Name: "Expertmill SRL",
        Address: {
          Street: "Calea Ion Zavoi, Nr. 8, Secto Nr. 8",
          City: "Sector 1, Bucuresti",
          District: "",
          PostCode: "015041",
          CountryCode: "RO",
        },
      },
      OrderingParty: {
        PartyID: "",
        AgencyCode: 91,
      },
    })
  );
  const xmlObject = {
    DocumentID: "B2",
    Variant: 1,
    NumberOfMessages: 1,
    invoice: {
      IssueDate: new Date(order.created!).toLocaleDateString("en-CA"),
      DocumentNumber: "",
      DocumentTypeCode: 380,
      DocumentFunctionCode: 9,
      GoodsServiceIDCode: "01",
      GoodsServiceIndication: "Goods Invoice",
      DocumentCurrency: "RON",
      References: {
        DeliveryNoteReference: {
          DocumentID: "",
        },
        SuppliersOrderReference: {
          DocumentID: "",
        },
        BuyerOrderReference: {
          DocumentID: "Internet",
        },
      },
      BuyerParty: {
        PartyID: "0007301081",
        AgencyCode: 91,
        Name: "Expertmill SRL",
        Address: {
          Street: "Jiului 7",
          City: "Branesti",
          District: "",
          PostCode: "077030",
          CountryCode: "RO",
        },
        VATRegistrationID: "RO14641390",
      },
      InvoiceIssuerParty: {
        PartyID: "1093",
        AgencyCode: 91,
        Name: "Pirelli Tyres Romania S.R.L.",
        LegalName: "Pirelli Tyres Romania S.R.L.",
        Address: {
          Street: "Strada Draganesti nr.35",
          City: "Slatina, Jud Olt",
          District: "",
          PostCode: "230150",
          CountryCode: "RO",
        },
        VATRegistrationID: "RO17060414",
        CompanyRegisteredCapital: "",
      },
      InvoiceeParty: {
        PartyID: "",
        AgencyCode: 91,
        Name: "Expertmill SRL",
        Address: {
          Street: "Jiului 7",
          City: "Branesti",
          District: "",
          PostCode: "077030",
          CountryCode: "RO",
        },
        VATRegistrationID: "RO14641390",
      },
      SellerParty: {
        PartyID: "1093",
        AgencyCode: 91,
        Name: "Pirelli Tyres Romania S.R.L.",
        LegalName: "Pirelli Tyres Romania S.R.L.",
        Address: {
          Street: "Strada Draganesti nr.35",
          City: "Slatina, Jud Olt",
          District: "",
          PostCode: "230150",
          CountryCode: "RO",
        },
        VATRegistrationID: "RO17060414",
        CompanyRegisteredCapital: "",
      },
      PaymentTerms: {
        PaymentNet: {
          PaymentDueDate: "",
        },
      },
      LineLevel: {
        LineId: "",
        OrderingMethod: "E",
        References: {
          DeliveryNoteReference: {
            DocumentID: "",
            LineID: "",
          },
          SuppliersOrderReference: {
            DocumentID: "",
            LineID: "",
          },
          BuyerOrderReference: {
            DocumentID: "Internet",
            LineID: 1,
          },
        },
        LineItemNetAmount: {
          AmountValue: totalAmountValue,
        },
        Article: Article,
        // price: order.total,
        // supplierID: or.productVariants.pirelliId,
        // ean: or.productVariants.ean,
        // fullSize: or.productVariants.fullSize,
        // quantity: or.quantity,
        // grossUnitPrice: (or.productVariants.price * 100) / 119,
        // allowanceOrChargeAmount:
        //   ((or.productVariants.price * 100) / 119) * or.quantity,
        // totalAmount: or.productVariants.price * or.quantity,
        // taxAmount: (or.productVariants.price * 19) / 119,
      },
      Controls: {
        NumberOfLineItems: 1,
      },
      Summary: {
        TotalAmount: {
          AmountValue: order.total,
        },
        TaxableAmount: {
          AmountValue: parseFloat(((order.total * 100) / 119).toFixed(2)),
        },
        TaxAmount: {
          AmountValue: parseFloat(((order.total * 19) / 119).toFixed(2)),
        },
        TaxDetails: {
          TaxTypeCode: "VAT",
          TaxAmount: {
            AmountValue: "",
          },
          TaxableAmount: {
            AmountValue: "",
          },
        },
      },
    },
  };

  return parse("ns0:invoice_list", xmlObject);
}
