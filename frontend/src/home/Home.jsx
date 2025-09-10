import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>Bobkovo.fun</h3>
          <p>
            Vítej u bobků. Tady najdeš všechny bobkovy aplikace. Pěkně na jednom
            místě a přehledně...
          </p>

          <p>Co všechno můžeš prozkoumat?</p>

          <ul>
            <li>
              <Link to="/weather">Počasí</Link> - podívej se jak je u nás nebo u
              tebe
            </li>
            <li>
              <Link to="/blog">Blog</Link> - Blog aplikace, ve které sdílím
              zajímavé odkazy a postupy pro vývoj v Pythonu, Reactu a v MS
              Dynamics 365 Business Central
            </li>
            <li>
              <Link to="/files">Soubory</Link> - Úložiště souborů
            </li>
            <li>
              <Link to="/gallery">Fotogalerii</Link> - pár fotek ze života
            </li>
          </ul>

          <h4>Externí odkazy</h4>

          <ul>
            <li>
              <a href="https://bobkovo.cz">MS Business Central 365 API</a> -
              Aplikace pro napojení na webové služby MS Business Central
            </li>
            <li>
              <a href="https://react.dev">React.dev</a> - Oficiační dokumentace
              pro React
            </li>
            <li>
              <a href="https://fastapi.tiangolo.com/">fastapi.tiangolo.com/</a>{" "}
              - Oficiační dokumentace pro FastAPI
            </li>
          </ul>

          <p>Ať se ti u nás líbí. :)</p>
        </div>
      </div>
    </div>
  );
}
