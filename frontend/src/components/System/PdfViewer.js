import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import pdfFile from '../../assets/docs/sample.pdf'
import packageJson from '../../../package.json'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function PdfViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const pdfjsDistVersion = packageJson.dependencies['pdfjs-dist'].split('^')
  const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjsDistVersion[1]}/build/pdf.worker.min.js`

  return (
    <div className="container">
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl={workerUrl}>
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}
        {!pdfFile && <>Pdf file not found</>}
      </div>
    </div>
  )
}

export default PdfViewer
