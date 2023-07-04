import { push } from '../../domain/router';

export default function MainDocumentTree({ $target, initialState }) {
  const $mainDocumentTree = document.createElement('div');
  $mainDocumentTree.classList.add('main-document__area');
  $target.appendChild($mainDocumentTree);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [nextState];
    this.render();
  };

  const mainDocumentTree = (tree) => {
    const text = `
    <ul>
      ${tree
        .map(
          ({ id, title, documents }) => `
        <div class="main-documents">
          <li class="main-document" data-id="${id}">▶️${title}</li>
          ${documents.map((document) => mainDocumentTree([document])).join('')}
        </div>
      `,
        )
        .join('')}
    </ul>
    `;
    return text;
  };

  this.render = () => {
    const documentsTree = mainDocumentTree(this.state);
    $mainDocumentTree.innerHTML = `<div class="main-documents__tree">${documentsTree}</div>`;
  };

  this.render();

  $mainDocumentTree.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    const id = $li?.dataset.id;
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}