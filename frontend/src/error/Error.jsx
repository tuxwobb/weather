import MainNavigation from "../navigation/MainNavigation";

export default function Error() {
  return (
    <>
      <MainNavigation />
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h3>Page doesn't exist.</h3>
          </div>
        </div>
      </div>
    </>
  );
}
