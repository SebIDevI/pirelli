"use client";

import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="bg-secondary bg-fixed font-gotham">
      <div className="w-full h-auto text-secondary-foreground relative overflow-hidden container p-6">
        <div className="w-full h-full relative mt-10">
          <div className="w-full h-full flex items-center py-14 gap-2">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="w-full">
                <p className="uppercase text-sm">
                  <Link
                    href={"/"}
                    className="uppercase font-gothamXLight relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-primary hover:after:w-full after:transition-all after:duration-500"
                  >
                    Homepage
                  </Link>{" "}
                  / POLITICA COOKIE
                </p>
                <h1 className="text-6xl font-gothamBlack py-10 uppercase">
                  POLITICA DE PRELUCRARE A DATELOR CU CARACTER PERSONAL
                </h1>
                <div className="font-gothamBook">
                  Acest site web („<span className="font-gotham">Site Web</span>
                  ”) colectează și prelucrează date cu caracter personal. Aceste
                  date cu caracter personal sunt utilizate pentru a identifica
                  browser-ul, computerul, sau orice alt dispozitiv mobil pe care
                  îl utilizați pentru a naviga pe internet. Datele cu caracter
                  personal sunt colectate de pe site-ul web prin intermediul
                  fișierelor software mici și al altor tehnologii de urmărire („
                  <span className="font-gotham">Cookie-uri</span>”).
                  <br />
                  <br />
                  <span className="font-gotham">
                    Ce cookie-uri sunt utilizate pe acest site web?
                  </span>
                  <br />
                  <br />
                  Site-ul web utilizează cookie-uri tehnice și de profil care
                  sunt instalate direct de noi (așa-numitele „Cookie-uri de
                  primă parte”) sau de partenerii noștri selectați (so-called „
                  <span className="font-gotham">Cookie-uri de la terți</span>”).
                  <br />
                  <br />
                  Modulele cookie de primă parte includ doar{" "}
                  <span className="font-gotham">Cookie tehnice</span>. Aceste
                  cookie-uri sunt strict necesare pentru a vă îmbunătăți
                  experiența de navigare și pentru a garanta funcționalitățile
                  tehnice de bază ale site-ului nostru web (de exemplu: acestea
                  sunt utilizate pentru a afișa conținutul pe site-urile web sau
                  pentru a reține preferințele de consimțământ). Consimțământul
                  dvs. nu este necesar pentru a ne permite să colectăm
                  informații despre dvs. și să instalăm această categorie
                  specială de cookie-uri. Acest lucru se datorează faptului că
                  ne bazăm pe temeiul legal al interesului nostru legitim de
                  afaceri în a vă oferi acces la site-ul nostru în cel mai bun
                  mod posibil.
                  <br />
                  <br />
                  Cookie-urile de la terți includ, de asemenea,{" "}
                  <span className="font-gotham">Cookie-uri de analiză</span>.
                  Aceste cookie-uri sunt utilizate în scopuri de analiză
                  statistică și pentru colectarea de informații despre
                  experiența dvs. pe site doar într-o formă agregată și anonimă
                  (de exemplu: sunt utilizate pentru a număra vizitele
                  utilizatorilor pe site). Consimțământul dvs. nu este necesar
                  pentru a ne permite să colectăm informații despre dvs. și să
                  instalăm această categorie specială de cookie-uri. Acest lucru
                  se datorează faptului că ne bazăm pe temeiul legal al
                  interesului nostru legitim de afaceri în colectarea de
                  informații strict menite să analizeze performanța site-ului
                  nostru în ceea ce privește acoperirea, vizibilitatea și
                  accesibilitatea online.
                  <br />
                  <br />
                  Site-ul include, de asemenea,{" "}
                  <span className="font-gotham">
                    funcții de partajare a conținutului pe rețelele sociale
                  </span>
                  . Când utilizați aceste funcții, platformele de socializare
                  pot colecta informații despre dvs., cum ar fi adresa IP,
                  paginile pe care le-ați vizitat sau cookie-urile care conțin
                  datele dvs. personale. Vă rugăm să rețineți că politicile de
                  confidențialitate ale acestor platforme de socializare
                  reglementează o astfel de prelucrare.
                  <br />
                  <br />
                  <span className="font-gotham">
                    Unde puteți găsi mai multe informații despre cookie-urile
                    utilizate pe acest site web?
                  </span>
                  <br />
                  <br />
                  Tabelul disponibil la{" "}
                  <Link href="#" className="underline font-gothamLight">
                    acest link
                  </Link>{" "}
                  explică mai detaliat modulele noastre cookie (de exemplu:
                  categoria lor specifică, perioadele de păstrare aplicabile și
                  linkurile către politicile aplicabile privind cookie-urile
                  terților selectați pentru preferințele de renunțare). Tabelul
                  este revizuit periodic (cel puțin o dată pe lună) pentru a ne
                  asigura că toate informațiile sunt corecte și actualizate.
                  <br />
                  <br />
                  Informații suplimentare privind activitățile noastre de
                  prelucrare a datelor cu caracter personal (inclusiv informații
                  privind compania care este operatorul de date pentru site-ul
                  web, modul în care vă puteți exercita drepturile de
                  confidențialitate și cum puteți contacta responsabilul cu
                  protecția datelor) pot fi găsite în{" "}
                  <Link
                    href="/legal/politica-de-confidentialitate"
                    className="underline font-gothamLight"
                  >
                    Politica noastră de confidențialitate.
                  </Link>
                  <br />
                  <br />
                  <span className="font-gotham">
                    Cum aleg setările pentru cookie-uri?
                  </span>
                  <br />
                  <br />
                  Când accesați site-ul pentru prima dată, va apărea o informare
                  scurtă privind utilizarea cookie-urilor, ca un banner pop-up
                  cu diferite butoane de selecție. Un astfel de banner pop-up
                  include un link către această Politică de cookie-uri.
                  <br />
                  <br />
                  Făcând clic pe butonul „Accept” din fereastra pop-up, veți
                  oferi în mod explicit consimțământul dvs. opțional pentru
                  instalarea cookie-urilor pentru care este necesar
                  consimțământul de înscriere (mai exact: Cookie-uri de
                  marketing). Preferințele privind consimțământul pentru
                  modulele cookie pot fi modificate în mod liber și în orice
                  moment direct de aici.
                  <br />
                  <br />
                  Apăsând pe butonul “Refuz”, pe simbolul “X” din colțul din
                  dreapta sus al bannerului sau pe butonul “Gestionați
                  preferințele pentru cookie-uri”, veți putea refuza instalarea
                  Cookie-urilor sau să decideți dacă acceptați o astfel de
                  instalare. În orice caz, veți putea accesa în continuare
                  site-ul web chiar și după refuzarea instalării cookie-urilor.
                  <br />
                  <br />
                  De asemenea, puteți seta browser-ul dvs. web să refuze
                  instalarea cookie-urilor în mod prestabilit sau să șteargă
                  toate cookie-urile instalate de pe computer sau de pe
                  dispozitivul mobil. Procedura variază în funcție de setările
                  specifice ale browser-ului web utilizat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
