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

          <ul className="list-group list-group-flush mb-2">
            <li className="list-group-item">
              <Link to="/weather" className="link-opacity-50-hover">
                Počasí
              </Link>{" "}
              - podívej se jak je u nás nebo u tebe
            </li>
            <li className="list-group-item">
              <Link to="/blog" className="link-opacity-50-hover">
                Blog
              </Link>{" "}
              - Blog aplikace, ve které sdílím zajímavé odkazy a postupy pro
              vývoj v Pythonu, Reactu a v MS Dynamics 365 Business Central
            </li>
            <li className="list-group-item">
              <Link to="/files" className="link-opacity-50-hover">
                Soubory
              </Link>{" "}
              - Úložiště souborů
            </li>
            <li className="list-group-item">
              <Link to="/gallery" className="link-opacity-50-hover">
                Fotogalerii
              </Link>{" "}
              - pár fotek ze života
            </li>
          </ul>

          <h4>Podívej se i na externí odkazy</h4>

          <ul className="list-group list-group-flush mb-2">
            <li className="list-group-item">
              <a href="https://bobkovo.cz" className="link-opacity-50-hover">
                MS Business Central 365 API
              </a>{" "}
              - Aplikace pro napojení na webové služby MS Business Central
            </li>
            <li className="list-group-item">
              <a href="https://react.dev" className="link-opacity-50-hover">
                React.dev
              </a>{" "}
              - Oficiační dokumentace pro React
            </li>
            <li className="list-group-item">
              <a
                href="https://fastapi.tiangolo.com/"
                className="link-opacity-50-hover"
              >
                fastapi.tiangolo.com/
              </a>{" "}
              - Oficiační dokumentace pro FastAPI
            </li>
          </ul>

          <p>Ať se ti u nás líbí. :)</p>
        </div>
      </div>
    </div>
  );
}
