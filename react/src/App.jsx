import Records from './Records.jsx'
import Modal from './Modal.jsx'
import { ErrorBoundary } from "react-error-boundary";
function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}


function App() {
  return (
    <>
      <ErrorBoundary  onError={console.error} FallbackComponent={Fallback} >
        <h2>React Test</h2>
        <div className="flex controls">
            <div><input type="button" value="Add Item" onClick={() => {
              document.getElementById('modal').classList.toggle('hidden');
            }} /></div>
            <div><input type="button" value="Clear Checked" onClick={() => {

            }} /></div>
        </div>
        <Records />
        <Modal />
      </ErrorBoundary>
    </>
  )
}

export default App
