export default function Files() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>Files</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <input
              className="form-control form-control-sm mb-1"
              type="file"
              id="formFile"
              multiple
            />
            <button type="button" className="btn btn-sm btn-secondary">
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Název</th>
                <th>Velikost</th>
                <th>Uživatel</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>test.txt</td>
                <td>0.1 MB</td>
                <td>Tomáš Miklík</td>
                <td>
                  <button type="button" className="btn btn-sm btn-light">
                    Stáhnout
                  </button>
                  <button type="button" className="btn btn-sm btn-danger">
                    Smazat
                  </button>
                </td>
              </tr>
              <tr>
                <td>dovolená.xlsx</td>
                <td>1.5 MB</td>
                <td>Tomáš Miklík</td>
                <td>
                  <button type="button" className="btn btn-sm btn-light">
                    Stáhnout
                  </button>
                  <button type="button" className="btn btn-sm btn-danger">
                    Smazat
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
