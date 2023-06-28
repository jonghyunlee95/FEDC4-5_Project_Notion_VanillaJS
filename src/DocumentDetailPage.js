import DocumentEditor from "./DocumentEditor.js";
import { request } from "./services/api.js";

export default function DocumentDetailPage({ $target, reRenderDocList }) {
  const $detailPageWrapper = document.createElement('div');
  $target.appendChild($detailPageWrapper);

  this.state = {}

  this.setState = async (documentId = null) => {
    const res = await request(`/documents/${documentId}`);
    this.state = res;
    console.log(this.state);
    this.render();
  }

  let timer = null;

  const documentEditor = new DocumentEditor({
    $target: $detailPageWrapper,
    initialState: this.state,
    onEditing: (state) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const res = await request(`/documents/${state.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: state.title,
            content: state.content
          }),
        })
        reRenderDocList();
      }, 1000);
    }
  })

  this.render = () => {
    documentEditor.setState(this.state);
  }

  this.render();
}