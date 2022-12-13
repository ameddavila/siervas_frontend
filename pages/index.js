import WidgetContenido from "../components/widgetContenido"
import WidgetFichas from "../components/widgetFichas"
export default function Home() {
  return (
    <div className="grid">
      <div className="col-12 xl:col-9">
        <WidgetContenido/>
      </div>
      <div className="col-12 xl:col-3">
        <WidgetFichas/>
      </div>

    </div>
  )
}
