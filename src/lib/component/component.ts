export abstract class Component {
  protected template!: string;
  protected element!: Element | null;
  protected children: Array<Component>;

  constructor() {
    this.children = [];
  }

  render() {
    // Se sobrescribe en las clases hijas
    // return this.element;
  }

  /*
    Renderiza un elemento en el selector recibido por parámetros
    añadiéndolo al principio o al final
    Retorna el elemento renderizado: primer o ultimo dentro del selector recibido
  */
  protected innRender(selector: string, position: 'start' | 'end' = 'end') {
    type validChild = 'firstElementChild' | 'lastElementChild';
    const positions = {
      start: { position: 'afterbegin', child: 'firstElementChild' },
      end: { position: 'beforeend', child: 'lastElementChild' },
    };
    this.element = this.selectElement(selector);
    this.element.insertAdjacentHTML(
      positions[position].position as InsertPosition,
      this.template
    );
    const child = positions[position].child as validChild;
    this.element = this.element[child];
    return this.element as Element;
  }

  /*
    Elimina el contenido del selector recibido
  */
  protected cleanHtml(selector: string) {
    this.element = this.selectElement(selector);
    this.element.innerHTML = '';
    return this.element;
  }

  private selectElement(selector: string): Element {
    const error = new Error('Invalid selector');
    if (!selector) throw error;
    const e = document.querySelector(selector);
    if (e === null) throw error;
    return e;
  }
}
