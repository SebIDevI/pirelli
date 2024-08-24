"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { add, edit } from "@/server/actions/excel";

async function parseExcelFile(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve) => {
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      resolve(parsedData);
    };
  });
}

function App() {
  const [data, setData] = useState([]);
  const [dataFin, setDataFin] = useState([]);
  const [dataFinTst, setDataFinTst] = useState([]);
  const [produse, setProduse] = useState([]);
  const [dataInteresting, setDataInteresting] = useState({});

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const parsedData = await parseExcelFile(file);
    setData(parsedData);
    console.log("parsedData");
    console.log(parsedData);
    const updatedProduse = parsedData
      .filter(
        (data) =>
          data.__rowNum__ > 14 && data.__EMPTY_21 === "SCORPION ZERO ALL SEASON"
        // data.__EMPTY_21.includes("SF2") &&
        // (data.__EMPTY_1.includes("ALLSEASON") ||
        //   data.__EMPTY_1.includes("ALL SEASON"))
      )
      .map((data) => ({
        nume: data.__EMPTY_21,
        descriere: [
          data.__EMPTY !== undefined && {
            nume: "SGTM",
            data: data.__EMPTY,
          },
          data.__EMPTY_1 !== undefined && {
            nume: "Sezonalitate",
            data: data.__EMPTY_1,
          },
          data.__EMPTY_2 !== undefined && {
            nume: "Prestige",
            data: data.__EMPTY_2,
          },
          data.__EMPTY_3 !== undefined && {
            nume: "Procetie RIM",
            data: data.__EMPTY_3,
          },
          data.__EMPTY_4 !== undefined && {
            nume: "Lat",
            data: data.__EMPTY_4,
          },
          data.__EMPTY_5 !== undefined && {
            nume: "Serie",
            data: data.__EMPTY_5,
          },
          data.__EMPTY_6 !== undefined && {
            nume: "RIM",
            data: data.__EMPTY_6,
          },
          data.__EMPTY_7 !== undefined && {
            nume: "Obs.1",
            data: data.__EMPTY_7,
          },
          data.__EMPTY_8 !== undefined && {
            nume: "Indice viteză",
            data: data.__EMPTY_8,
          },
          data.__EMPTY_9 !== undefined && {
            nume: "Indice întoarcere",
            data: data.__EMPTY_9,
          },
          data.__EMPTY_10 !== undefined && {
            nume: "Extra Load/C",
            data: data.__EMPTY_10,
          },
          data.__EMPTY_11 !== undefined && {
            nume: "LS/SC",
            data: data.__EMPTY_11,
          },
          data.__EMPTY_12 !== undefined && {
            nume: "Size 1",
            data: data.__EMPTY_12,
          },
          data.__EMPTY_13 !== undefined && {
            nume: "Size 2",
            data: data.__EMPTY_13,
          },
          data.__EMPTY_14 !== undefined && {
            nume: "Tara origine estimata",
            data: data.__EMPTY_14,
          },
          data.__EMPTY_15 !== undefined && {
            nume: "Greutate",
            data: data.__EMPTY_15,
          },
          data.__EMPTY_16 !== undefined && {
            nume: "Volum",
            data: data.__EMPTY_16,
          },
          data.__EMPTY_17 !== undefined && {
            nume: "EAN CODE",
            data: data.__EMPTY_17,
          },
          data.__EMPTY_18 !== undefined && {
            nume: "Marcaj OE",
            data: data.__EMPTY_18,
          },
          data.__EMPTY_19 !== undefined && {
            nume: "Omologare",
            data: data.__EMPTY_19,
          },
          data.__EMPTY_20 !== undefined && {
            nume: "Profil",
            data: data.__EMPTY_20,
          },
          data.__EMPTY_21 !== undefined && {
            nume: "Descriere Profil",
            data: data.__EMPTY_21,
          },
          data.__EMPTY_22 !== undefined && {
            nume: "IP Code",
            data: data.__EMPTY_22,
          },
          data.__EMPTY_23 !== undefined && {
            nume: "Descriere Produs",
            data: data.__EMPTY_23,
          },
          data.__EMPTY_24 !== undefined && {
            nume: "Obs.2",
            data: data.__EMPTY_24,
          },
          data.__EMPTY_25 !== undefined && {
            nume: "EPREL LINK",
            data: data.__EMPTY_25,
          },
          data.__EMPTY_26 !== undefined && {
            nume: "RR",
            data: data.__EMPTY_26,
          },
          data.__EMPTY_27 !== undefined && {
            nume: "WG",
            data: data.__EMPTY_27,
          },
          data.__EMPTY_28 !== undefined &&
            data.__EMPTY_29 !== undefined && {
              nume: "NO/GR",
              data: data.__EMPTY_28 + " " + data.__EMPTY_29,
            },
          data.__EMPTY_30 !== undefined && {
            nume: "SEVERE SNOW TYRE",
            data: data.__EMPTY_30,
          },
          data.__EMPTY_31 !== undefined && {
            nume: "ICE GRIP TYRE",
            data: data.__EMPTY_31,
          },
          data.__EMPTY_32 !== undefined && {
            nume: "Pret de Lista fara TVA",
            data: data.__EMPTY_32,
          },
          data.__EMPTY_33 !== undefined && {
            nume: "Pret Net In Factura fara TVA (RON) cu Disc",
            data: data.__EMPTY_33,
          },
          data.__EMPTY_35 !== undefined && {
            nume: "Comanda Pirelli",
            data: data.__EMPTY_35,
          },
          data.__EMPTY_36 !== undefined && {
            nume: "Comanda Client",
            data: data.__EMPTY_36,
          },
          data.__EMPTY_37 !== undefined && {
            nume: "Valoare fara TVA    Comanda Initiala  (RON)",
            data: data.__EMPTY_37,
          },
        ],
        pret: data.__EMPTY_34.toFixed(2),
      }));
    setProduse(updatedProduse);
    console.log(updatedProduse);
    const data2 = updatedProduse.map((item) => ({
      nume: item.nume,
      pret: item.pret,
      features:
        // indice viteza
        item.descriere[8]?.nume +
        ": " +
        item.descriere[8]?.data +
        ", " +
        // rr
        item.descriere[26]?.nume +
        ": " +
        item.descriere[26]?.data +
        ", " +
        // wg
        item.descriere[27]?.nume +
        ": " +
        item.descriere[27]?.data +
        ", " +
        // size
        "fullSize" +
        ": " +
        item.descriere[23]?.data,
      id: item.descriere[22]?.data,
      EAN: item.descriere[17]?.data,
      EPRELLINK: item.descriere[25]?.data,
      OE: item.descriere[18]?.data,
      descProd: item.descriere[23]?.data,
      family: item.descriere[21]?.data,
      obs: item.descriere[24]?.data,
      prestige: item.descriere[2]?.data,
      protectieRIM: item.descriere[3]?.data,
      season: item.descriere[1]?.data,
      size: item.descriere[12]?.data,
      type: item.descriere[0]?.data,
    }));

    const vtags = [[]];

    updatedProduse.map((item, i) => {
      item.descriere.map((desc) => {
        if (
          desc.nume === "SGTM" ||
          desc.nume === "Sezonalitate" ||
          desc.nume === "Obs.1" ||
          desc.nume === "LS/SC" ||
          desc.nume === "Size 1" ||
          desc.nume === "Omologare" ||
          desc.nume === "Obs.2" ||
          desc.nume === "SEVERE SNOW TYRE" ||
          desc.nume === "ICE GRIP TYRE" ||
          desc.nume === "Descriere Profil"
        ) {
          if (desc.nume === "Sezonalitate") {
            if (desc.data.includes("SUMMER")) vtags[i].push("SUMMER");
            else if (desc.data.includes("WINTER")) vtags[i].push("WINTER");
            else if (
              desc.data.includes("ALL SEASON") ||
              desc.data.includes("ALLSEASON")
            )
              vtags[i].push("ALL SEASON");

            if (desc.data.includes("3PMSF")) vtags[i].push("3PMSF");
          } else if (desc.nume === "Obs.1") {
            if (desc.data !== "std") {
              if (desc.data.includes(" + ")) {
                const datas = desc.data.split(" + ");
                datas.forEach((dataz) => {
                  vtags[i].push(dataz);
                });
              } else {
                vtags[i].push(desc.data);
              }
            }
          } else if (desc.nume === "LS/SC") {
            if (desc.data !== "-") vtags[i].push(desc.data);
          } else if (desc.nume === "Omologare") {
            if (desc.data !== "-") {
              if (desc.data.includes("-")) {
                const datas2 = desc.data.split("-");
                vtags[i].push("Omologare: " + datas2.join(", "));
              } else {
                vtags[i].push("Omologare: " + desc.data);
              }
            }
          } else if (desc.nume === "Obs.2") {
            if (desc.data !== "-") vtags[i].push(desc.data);
          } else if (desc.nume === "SEVERE SNOW TYRE") {
            if (desc.data !== "-") vtags[i].push("SEVERE SNOW TYRE");
          } else if (desc.nume === "ICE GRIP TYRE") {
            if (desc.data !== "-") vtags[i].push("ICE GRIP TYRE");
          } else if (desc.nume === "Descriere Profil") {
            if (desc.data !== "-") vtags[i].push("SCORPION");
          } else {
            vtags[i].push(desc.data);
          }
        }
      });
      vtags[i].push("DRY-83");
      vtags[i].push("MILEAGE-69");
      vtags[i].push("COMFORT-76");
      if (i !== updatedProduse.length - 1) vtags.push([]);
    });

    setDataInteresting({
      title: "SCORPION ZERO ALL SEASON",
      description:
        "<p><strong>SCORPION™ ZERO ALL SEASON</strong> este noul produs all-season UHP pentru modele SUV dezvoltat ca echipare originală pentru producatorii auto premium. Aceasta anvelopă este construită pentru a maximiza performanțele în toate anotimpurile, pentru orice stil de condus, inclusiv pe drumuri acoperite de zăpadă. Compușii inovatori combinați cu modelul asimetric ofera performanțe UHP pe parcursul tuturor anotimpurilor, asigurand niveluri remarcabile de siguranță și confort, minimizând nivelul de zgomot.</p>",
      smalldesc: "Performanță pe toate planurile pentru SUV-uri",
      variants: updatedProduse.map((item, i) => ({
        productType: item.descriere[12].data,
        price: item.pret,
        pirelliId: item.descriere[22].data,
        ean: item.descriere[17].data,
        eprellLink: item.descriere[25].data,
        fullSize: item.descriere[23].data,
        lssc: item.descriere[11].data,
        rr: item.descriere[26].data,
        wg: item.descriere[27].data,
        prestige: item.descriere[2].data === "-" ? false : true,
        protectieRIM: item.descriere[3].data === "-" ? false : true,
        size: item.descriere[12].data,
        variantTags: vtags[i].map((tag) => ({
          tag: tag,
        })),
      })),
    });

    // setDataFin(data2);
    setDataFinTst([data2[697], data2[698]]);
  };

  return (
    <div className="overflow-y-auto">
      {/* {console.log(dataFinTst)} */}
      {/* ================================================== */}
      <div
        className="flex h-80 items-center justify-center w-full bg-dark rounded-md"
        style={{ height: "320px" }}
      >
        <input
          type="file"
          accept=".xlsx, .xls"
          className="mt-80"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => add(dataInteresting)}
          className="py-5 px-7 text-4xl rounded-lg bg-yellow-400"
        >
          Adauga
        </button>
      </div>
      {!produse.length && "test"}
      {/* ================================================== */}
      {produse.length > 0 && (
        <div>
          Produse:
          {produse.map((produs, index) => (
            <div
              key={index}
              className="p-6 bg-primary text-primary-foreground rounded-md mb-6 flex items-center justify-between"
            >
              <div className="text-left">
                <b>{index + 1}.</b> <br />
                <b>Nume: </b>
                <p>{produs.nume}</p>
                <span className="text-sm font-medium text-secondary">
                  {produs.pret} RON
                </span>
              </div>
              <div className="text-right max-w-[40%]">
                <b>Descriere</b>
                {produs.descriere
                  .filter((caract) => caract.nume)
                  .map((caract, i) => (
                    <div key={i}>
                      {caract.nume === "SGTM" ||
                      caract.nume === "Sezonalitate" ||
                      caract.nume === "Indice viteză" ||
                      caract.nume === "Size 1" ||
                      caract.nume === "RR" ||
                      caract.nume === "WG" ? (
                        <p>
                          <b>{caract.nume}: </b>
                          {caract.data}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
