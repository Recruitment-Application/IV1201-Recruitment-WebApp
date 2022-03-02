import { Container, Spinner } from "react-bootstrap";

function promiseNoData(promise, data, error) {
  return (
    (!promise && "no data") ||
    (error && <h1>{error}</h1>) ||
    (!data && (
      <Container className="d-flex justify-content-center mt-5"><Spinner className="m-50" animation="grow" role="status"></Spinner></Container>
    ))
  );
}

export default promiseNoData;