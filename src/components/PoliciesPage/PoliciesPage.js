import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PoliciesPage.css';

const PoliciesPage = () => {
  const { page } = useParams();
  const [selectedPage, setSelectedPage] = useState();

  useEffect(() => {
    setSelectedPage(page);
  }, [page]);


  return (
    <div className="policies-page">
      <div className="policies-page-menu">
        <ul>
          <li onClick={() => setSelectedPage('termsAndConditions')} className={`${selectedPage === 'termsAndConditions' ? '-selected' : ''}`}>Termini e Condizioni</li>
          <li onClick={() => setSelectedPage('privacyPolicy')} className={`${selectedPage === 'privacyPolicy' ? '-selected' : ''}`}>Privacy Policy</li>
          <li onClick={() => setSelectedPage('returnsAndRefunds')} className={`${selectedPage === 'returnsAndRefunds' ? '-selected' : ''}`}>Resi e Rimborsi</li>
        </ul>
      </div>
      <div className="policies-page-text-area">
        {selectedPage === 'termsAndConditions' && <TermsAndConditions />}
        {selectedPage === 'privacyPolicy' && <PrivacyPolicy />}
        {selectedPage === 'returnsAndRefunds' && <ReturnsAndRefunds />}
      </div>
    </div>
  )
}

const TermsAndConditions = () => {
  return (
    <>
      <h2>Termini e Condizioni</h2>
      <div className="mt-2">
        <p>
          Le diamo il benvenuto su notforsaleweb.it!<br /><br />

          I termini e le condizioni seguenti indicano regole e normative per l'utilizzo del sito di NOT FOR SALE, all'indirizzo https://notforsaleweb.it.<br /><br />

          Accedendo a questo sito, Lei accetta i termini e le condizioni seguenti. Le chiediamo di non continuare ad usare notforsaleweb.it nel caso in cui non fosse d'accordo con tutti i termini e le condizioni in questa pagina.<br /><br />

          Cookie:<br />
          Il sito utilizza cookie per personalizzare l'esperienza online. Accedendo a notforsaleweb.it, accetta l'uso dei cookie richiesti.<br /><br />

          Un cookie è un file di testo che viene posizionato sull'hard disk da un server web. I cookie non possono essere usati per eseguire programmi o inviare virus al computer. I cookie vengono assegnati unicamente a Lei e possono essere letti solo dal server web nel dominio che ha emesso il cookie.<br /><br />

          Sono presenti dei cookie necessari indispensabili per il funzionamento del sito. Tali cookie non richiedono il consenso dato che sono attivi in ogni caso.<br /><br />

          Licenza:<br />
          A meno che indicato altrimenti, NOT FOR SALE e/o gli affiliati con licenza detengono i diritti di proprietà intellettuale per tutto il materiale su notforsaleweb.it. Tutti i diritti di proprietà intellettuale sono riservati. Può accedervi tramite notforsaleweb.it per uso personale soggetto a restrizioni indicate nei termini e nelle condizioni seguenti.<br /><br />

          Non è consentito:<br />
        </p>

        <ul>
          <li>Copiare o ripubblicare il materiale di notforsaleweb.it</li>
          <li>Vendere, noleggiare o fornire in sub-licenza il materiale di notforsaleweb.it</li>
          <li>Riprodurre, duplicare o copiare il materiale di notforsaleweb.it</li>
          <li>Ridistribuire contenuti di notforsaleweb.it</li>
          <li>Il presente accordo ha inizio dalla data qui indicata.</li>
        </ul><br />

        <p>
          Parti di questo sito offrono all'utente la possibilità di pubblicare e scambiare opinioni e informazioni in certe aree del sito. NOT FOR SALE non filtra, modifica, pubblica o revisiona i commenti prima di aggiungerli sul sito. I commenti non riflettono il punto di vista e l'opinione di NOT FOR SALE, dei suoi agenti e/o dei suoi affiliati. I commenti riflettono punto di vista e opinione di colui che pubblica tale punto di vista o opinione. Nella misura consentita dalla legge, NOT FOR SALE non deve essere ritenuta responsabile per i commenti e non può ricevere richieste di risarcimento danni o spese causate dall'uso, dalla pubblicazione e/o dalla presenza dei commenti sul sito.<br /><br />

          NOT FOR SALE si riserva il diritto di monitorare tutti i commenti e rimuovere quelli che considera non appropriati, offensivi o in violazione con i presenti termini e condizioni.<br /><br />

          Lei garantisce che:<br />
        </p>

        <ul>
          <li>È autorizzato a pubblicare commenti sul sito e ha tutte le licenze e i permessi necessari per tale azione;</li>
          <li>I commenti non violano nessun diritto di proprietà intellettuale, inclusi senza limitazione diritto d'autore, brevetti o marchi commerciali di terze parti;</li>
          <li>I commenti non contengono materiale diffamatorio, calunnioso, offensivo, indecente o altrimenti illegale, provocando una violazione della privacy;</li>
          <li>I commenti non verranno usati per sollecitare o promuovere business, attività commerciali o illegali.</li>
          <li>Lei concede a NOT FOR SALE una licenza non esclusiva di usare, riprodurre, modificare e autorizza altri a usare, riprodurre e modificare qualsiasi Suo commento in ogni forma, formato o media.</li>
        </ul><br />

        <p>
          Collegamenti ipertestuali ai nostri contenuti:<br /><br />

          Le organizzazioni seguenti potrebbero aggiungere collegamenti ipertestuali al nostro sito senza previa autorizzazione scritta:<br />
        </p>

        <ul>
          <li>Agenzie governative;</li>
          <li>Motori di ricerca;</li>
          <li>Testate giornalistiche.</li>
        </ul>
      </div>
    </>
  )
}

const PrivacyPolicy = () => {
  return (
    <>
      <h2>Privacy Policy</h2>
      <div className="mt-2">
        <p>
          Il sito notforsaleweb.it è di proprietà di NOT FOR SALE, titolare del trattamento dei Suoi dati personali.<br /><br />

          Abbiamo adottato questa politica sulla privacy, la quale determina il trattamento delle informazioni raccolte da notforsaleweb.it, oltre che i motivi per raccolta di certi dati personali a Lei correlati. Pertanto, deve leggere questa politica sulla riservatezza prima di usare il sito notforsaleweb.it.<br /><br />

          Trattiamo i Suoi dati personali e garantiamo riservatezza e sicurezza degli stessi.<br /><br />

          Informazioni personali raccolte:<br />
          Quando visita notforsaleweb.it, raccogliamo automaticamente certe informazioni sul dispositivo, incluse informazioni su browser web, indirizzo IP, fuso orario e cookie installati sul dispositivo. Inoltre, navigando sul sito, raccogliamo informazioni sulle pagine web o i prodotti visualizzati, siti web o termini di ricerca di riferimento verso il sito e come Lei interagisce con il sito. Indichiamo tali informazioni raccolte automaticamente come “informazioni sul dispositivo”. Inoltre, potremmo raccogliere dati personali che ci fornisce (inclusi senza limitazione nome, cognome, indirizzo, informazioni di pagamento ecc.) durante la registrazione per soddisfare l'accordo.<br /><br />

          Perché trattiamo i dati?<br />
          La sicurezza dei dati dei clienti è una nostra priorità, pertanto trattiamo solo i dati degli utenti strettamente necessari per gestire il sito. Le informazioni raccolte automaticamente vengono utilizzate solo per identificare casi potenziali di abuso e stabilire statistiche sull'uso del sito. Queste informazioni statistiche non sono aggregate in modo da identificare un utente specifico del sistema.<br /><br />

          Le è consentito visitare il sito senza rivelare informazioni, tramite le quali potrebbe essere identificato personalmente. Se, tuttavia, desidera utilizzare alcune delle funzioni del sito, o desidera ricevere newsletter o fornire altri dettagli compilando un modulo, potrebbe doverci fornire dati personali come email, nome, cognome, città di residenza, organizzazione e numero di telefono. Può scegliere di non fornire dati personali, tuttavia in tal caso non potrà usufruire di alcune funzioni del sito. Gli utenti che non sanno quali informazioni sono obbligatorie, possono contattarci a notforsaleweb@gmail.com.<br /><br />

          I Suoi diritti:<br /><br />
          Se è residente nell'Unione Europea, dispone dei seguenti diritti sui dati personali:<br />
        </p>
        <ul>
          <li>Il diritto di essere informato.</li>
          <li>Il diritto all'accesso.</li>
          <li>Il diritto di modifica.</li>
          <li>Il diritto di eliminazione.</li>
          <li>Il diritto di limitazione del trattamento.</li>
          <li>Il diritto di portabilità dei dati.</li>
          <li>Il diritto di obiezione.</li>
          <li>Il diritto in relazione a decisione e profilazione automatizzata.</li>
        </ul><br /><br />

        <p>
          Per esercitare questi diritti, si prega di contattarci tramite le informazioni di contatto sotto.<br /><br />

          Inoltre, se è residente nell'Unione Europea, trattiamo le Sue informazioni al fine di stipulare i contratti con Lei (per esempio, in caso di ordine tramite il sito), o soddisfare in altro modo i nostri interessi commerciali legittimi indicati sopra. Ancora, notare che le informazioni possono essere trasferite fuori dall'Europa, incluso in Canada e negli Stati Uniti.<br /><br />

          Collegamenti ad altri siti:<br />
          Il nostro sito potrebbe contenere collegamenti ad altri siti non gestiti o controllati da noi. Notare che non siamo responsabili per le pratiche sulla riservatezza di altri siti o di terzi. Invitiamo a prestare attenzione nel caso in cui si esca dal sito e leggere le dichiarazioni sulla riservatezza di ogni sito che potrebbe raccogliere informazioni personali.<br /><br />

          Sicurezza delle informazioni:<br />
          Proteggiamo le informazioni fornite su server informatici controllati, un ambiente sicuro protetto da accesso, uso o divulgazione non autorizzata. Adottiamo sistemi di protezione fisica, tecnica e amministrativa ragionevoli per proteggere da accesso, uso, modifica e divulgazione non autorizzata delle informazioni personali in nostro possesso.
        </p>
      </div>
    </>
  )
}

const ReturnsAndRefunds = () => {
  return (
    <>
      <h2>Resi e Rimborsi</h2>
      <div className="mt-2">
        <p>
          Al fine di esercitare questo diritto di annullamento, deve informarci della decisione con una dichiarazione chiara.<br /><br />

          Può informarci tramite email a notforsaleweb@gmail.com o contatto whatsapp al +39 351 370 8950.<br /><br />

          Invieremo il rimborso entro 30 giorni dalla data di ricezione dei prodotti restituiti. Utilizzeremo lo stesso metodo di pagamento usato per l'ordine e verranno addebitate commissioni per il rimborso pari alle spese di spedizione (se si spedisce con poste italiane delivery standard, il costo parte da una base di €9,40).<br /><br />

          Condizioni sui resi:<br />
          Per fare in modo che i prodotti siano idonei alla restituzione, assicurarsi che:<br /><br />
        </p>

        <ul>
          <li>I prodotti siano stati acquistati da non più di 3 giorni</li>
          <li>I prodotti siano nella confezione originale</li>
        </ul><br />

        <p>
          I prodotti seguenti non possono essere restituiti:<br />
        </p>
        <ul>
          <li>Prodotti forniti secondo specifiche o personalizzazione indicata.</li>
          <li>Prodotti forniti che per natura non sono restituibili, ad esempio prodotti che deperiscono rapidamente o scaduti.</li>
          <li>Prodotti forniti che non sono restituibili per motivi igienici e sanitari, aperti dopo la consegna.</li>
          <li>Prodotti forniti che, dopo la consegna, per natura, sono inseparabili da altri.</li>
        </ul><br />
        <p>
          Ci riserviamo il diritto di rifiutare resi di prodotti che non soddisfano le condizioni di restituzione sopra a nostra sola discrezione.<br /><br />

          Prodotti restituiti:<br />
          Lei è responsabile del costo e dei rischi di restituzione dei prodotti.<br />
          Non possiamo essere ritenuti responsabili per prodotti restituiti smarriti o danneggiati durante la spedizione. Pertanto, suggeriamo di utilizzare un servizio di spedizione tracciato e assicurato. Non siamo in grado di fornire un rimborso senza aver ricevuto i prodotti o senza una prova di spedizione dei prodotti.<br /><br />

          DISCLAIMER:<br />
          ACCETTIAMO RESI SE E SOLO SE IL PRODOTTO ARRIVA DANNEGGIATO, NON FUNZIONANTE O NON COME PREVISTO DALLE FOTO.
        </p>
      </div>
    </>
  )
}

export default PoliciesPage