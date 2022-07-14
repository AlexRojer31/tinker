import { Application } from "/components/Application.js";

import { Ajax } from "/tools/Ajax.js";

export {Snap};

class Snap {

    #application = new Application('Технологическая оснастка ПТ', 'def.svg', 1500, 500, 200, 200);
    #verticalNavigation = document.createElement('div');
    #content = document.createElement('div');

    constructor() {
        this.#application.render();
        this.#navigationConstruct();
        this.#contentConstrcut();
        this.#application.getApplication().style.backgroundColor = 'rgb(240, 240, 240)';
    }

    getContent() {
        return this.#content;
    }

    #navigationConstruct() {
        this.#verticalNavigation.style.width = '250px';
        this.#verticalNavigation.style.overflow = 'auto';
        this.#verticalNavigation.style.position = 'absolute';
        this.#verticalNavigation.style.left = '0';
        this.#verticalNavigation.style.backgroundColor = 'lightgrey';
        this.#setHeightController(this.#application.getWorkSpace(), this.#verticalNavigation);
        this.#application.getWorkSpace().appendChild(this.#verticalNavigation);

        let obj = this;
        let field = obj.getContent();
        this.#addNavButton('Дорны', () => {
            field.innerHTML = '';

            let constructor = document.createElement('div');
            constructor.classList.add('button');
            constructor.style.float = 'left';
            constructor.style.marginBottom = '20px';
            constructor.style.padding = '5px 15px';
            constructor.style.boxShadow = '1px 1px 3px black';
            constructor.innerHTML = 'Create mandrel';
            constructor.addEventListener('click', () => {
                let mandrelCreator = new Application('Mandrel creator');
                mandrelCreator.render(field);
                mandrelCreator.getApplication().style.left = event.clientX + 'px';
                mandrelCreator.getApplication().style.top = event.clientY + 'px';
                mandrelCreator.getWorkSpace().innerHTML = 'create new mandrel';
            });
            field.appendChild(constructor);

            let searcher = document.createElement('input');
            searcher.style.clear = 'both';
            searcher.type = 'text';
            searcher.style.display = 'block';
            searcher.style.marginBottom = '20px';
            searcher.addEventListener('keyup', () => {
                constructor.innerHTML = searcher.value;
            });
            field.appendChild(searcher);

            let table = document.createElement('table');
            table.style.borderCollapse = 'collapse';

            let tr = document.createElement('tr');
            let inventory = document.createElement('th');
            let drawingNumber = document.createElement('th');
            let drawingFormativeSize = document.createElement('th');
            let drawing = document.createElement('th');
            let realFormativeSize = document.createElement('th');
            let numberOfCasting = document.createElement('th');
            let lastModification = document.createElement('th');
            let Commissioning = document.createElement('th');
            let writeOfDate = document.createElement('th');
            inventory.innerHTML = 'inventory';
            drawingNumber.innerHTML = 'drawingNumber';
            drawingFormativeSize.innerHTML = 'drawingFormativeSize';
            drawing.innerHTML = 'drawing';
            realFormativeSize.innerHTML = 'realFormativeSize';
            numberOfCasting.innerHTML = 'numberOfCasting';
            lastModification.innerHTML = 'lastModification';
            Commissioning.innerHTML = 'Commissioning';
            writeOfDate.innerHTML = 'writeOfDate';
            inventory.style.border = '1px solid black';
            drawingNumber.style.border = '1px solid black';
            drawingFormativeSize.style.border = '1px solid black';
            drawing.style.border = '1px solid black';
            realFormativeSize.style.border = '1px solid black';
            numberOfCasting.style.border = '1px solid black';
            lastModification.style.border = '1px solid black';
            Commissioning.style.border = '1px solid black';
            writeOfDate.style.border = '1px solid black';
            inventory.style.padding = '5px 15px';
            drawingNumber.style.padding = '5px 15px';
            drawingFormativeSize.style.padding = '5px 15px';
            drawing.style.padding = '5px 15px';
            realFormativeSize.style.padding = '5px 15px';
            numberOfCasting.style.padding = '5px 15px';
            lastModification.style.padding = '5px 15px';
            Commissioning.style.padding = '5px 15px';
            writeOfDate.style.padding = '5px 15px';
            tr.appendChild(inventory);
            tr.appendChild(drawingNumber);
            tr.appendChild(drawingFormativeSize);
            tr.appendChild(drawing);
            tr.appendChild(realFormativeSize);
            tr.appendChild(numberOfCasting);
            tr.appendChild(lastModification);
            tr.appendChild(Commissioning);
            tr.appendChild(writeOfDate);
            table.appendChild(tr);
            

            for (let i = 0 ; i < 100; i++) {
                let tr = document.createElement('tr');
                let inventory = document.createElement('td');
                let drawingNumber = document.createElement('td');
                let drawingFormativeSize = document.createElement('td');
                let drawing = document.createElement('td');
                let realFormativeSize = document.createElement('td');
                let numberOfCasting = document.createElement('td');
                let lastModification = document.createElement('td');
                let Commissioning = document.createElement('td');
                let writeOfDate = document.createElement('td');
                inventory.innerHTML = i;
                drawingNumber.innerHTML = 'drawingNumber';
                drawingFormativeSize.innerHTML = 'drawingFormativeSize';
                drawing.innerHTML = 'drawing';
                realFormativeSize.innerHTML = 'realFormativeSize';
                numberOfCasting.innerHTML = 'numberOfCasting';
                lastModification.innerHTML = 'lastModification';
                Commissioning.innerHTML = 'Commissioning';
                writeOfDate.innerHTML = 'writeOfDate';
                inventory.style.border = '1px solid black';
                drawingNumber.style.border = '1px solid black';
                drawingFormativeSize.style.border = '1px solid black';
                drawing.style.border = '1px solid black';
                realFormativeSize.style.border = '1px solid black';
                numberOfCasting.style.border = '1px solid black';
                lastModification.style.border = '1px solid black';
                Commissioning.style.border = '1px solid black';
                writeOfDate.style.border = '1px solid black';
                inventory.style.padding = '5px 15px';
                drawingNumber.style.padding = '5px 15px';
                drawingFormativeSize.style.padding = '5px 15px';
                drawing.style.padding = '5px 15px';
                realFormativeSize.style.padding = '5px 15px';
                numberOfCasting.style.padding = '5px 15px';
                lastModification.style.padding = '5px 15px';
                Commissioning.style.padding = '5px 15px';
                writeOfDate.style.padding = '5px 15px';
                tr.appendChild(inventory);
                tr.appendChild(drawingNumber);
                tr.appendChild(drawingFormativeSize);
                tr.appendChild(drawing);
                tr.appendChild(realFormativeSize);
                tr.appendChild(numberOfCasting);
                tr.appendChild(lastModification);
                tr.appendChild(Commissioning);
                tr.appendChild(writeOfDate);
                tr.addEventListener('click', () => {
                    let mandrelRedactor = new Application('Mandrel redactor' + i);
                    mandrelRedactor.render(field);
                    mandrelRedactor.getApplication().style.left = event.clientX + 'px';
                    mandrelRedactor.getApplication().style.top = event.clientY + 'px';
                    mandrelRedactor.getWorkSpace().innerHTML = inventory.innerHTML;
                });
                table.appendChild(tr);
            }
            field.appendChild(table);
        
            let brash = document.createElement('div');
            brash.style.height = '30px';
            field.appendChild(brash);
        });
        this.#addNavButton('Кристаллизаторы', () => {
            obj.getContent().innerHTML = `
            <style>
            btn {
                float: left;
                border: 2px solid black;
            }
            table {
                border-collapse: collapse;
            }
            td {
                border: 1px solid black;
                text-align: center;
                padding: 5px;
            }
            </style>
            <btn  onclick="alert('create new crystallyzer card');">Create crystallyzer</btn><br><br>
            <label>Search string:</label> <input type="search"><br><br>
            <table>
                <tr>
                    <td>Inventory</td>
                    <td>Drawing number</td>
                    <td>Drawing formative size</td>
                    <td>Real formative size</td>
                    <td>Number of castings</td>
                    <td>Last modification</td>
                    <td>Commissioning</td>
                    <td>Write-of date</td>
                </tr>
                <tr onclick="alert('open crystallyzer card');">
                    <td>123654</td>
                    <td>333-0225</td>
                    <td>558</td>
                    <td>550</td>
                    <td>24</td>
                    <td>10-12-2020</td>
                    <td>02-02-2019</td>
                    <td>null</td>
                </tr>
                <tr onclick="alert('open crystallyzer card');">
                    <td>123654</td>
                    <td>333-0225</td>
                    <td>558</td>
                    <td>550</td>
                    <td>24</td>
                    <td>10-12-2020</td>
                    <td>02-02-2019</td>
                    <td>null</td>
                </tr>
            </table>
            `;
        });
        this.#addNavButton('Шлаковые надставки', () => {
            obj.getContent().innerHTML = `
            <style>
            btn {
                float: left;
                border: 2px solid black;
            }
            table {
                border-collapse: collapse;
            }
            td {
                border: 1px solid black;
                text-align: center;
                padding: 5px;
            }
            </style>
            <btn  onclick="alert('create new slag mode card');">Create slag mode</btn><br><br>
            <label>Search string:</label> <input type="search"><br><br>
            <table>
                <tr>
                    <td>Inventory</td>
                    <td>Drawing number</td>
                    <td>Drawing formative size</td>
                    <td>Real formative size</td>
                    <td>Number of castings</td>
                    <td>Last modification</td>
                    <td>Commissioning</td>
                    <td>Write-of date</td>
                </tr>
                <tr onclick="alert('open slag mode card');">
                    <td>123654</td>
                    <td>333-0225</td>
                    <td>558</td>
                    <td>550</td>
                    <td>24</td>
                    <td>10-12-2020</td>
                    <td>02-02-2019</td>
                    <td>null</td>
                </tr>
                <tr onclick="alert('open slag mode card');">
                    <td>123654</td>
                    <td>333-0225</td>
                    <td>558</td>
                    <td>550</td>
                    <td>24</td>
                    <td>10-12-2020</td>
                    <td>02-02-2019</td>
                    <td>null</td>
                </tr>
            </table>
            `;
        });
        
        let brash = document.createElement('div');
        brash.style.height = '30px';
        this.#verticalNavigation.appendChild(brash);
    }

    #contentConstrcut() {
        this.#content.style.overflow = 'auto';
        this.#content.style.position = 'absolute';
        this.#content.style.padding = '10px';
        this.#content.style.left = '250px';
        this.#content.innerHTML = '<h1 style="text-align:center;"><br><br><br><br><br>Добро пожаловать в программу учета технологической оснастки</h1>';
        this.#setHeightController(this.#application.getWorkSpace(), this.#content);
        this.#application.getWorkSpace().appendChild(this.#content);
    }

    #setHeightController(manager, guided) {
        function funcObserver(mutation, navigatorObserver) {
            for (let i = 0;i < mutation.length;i++) {
                if (mutation[i].attributeName === 'style') {
                    let guidedHeight = manager.style.height;
                    guided.style.height = manager.style.height;
                } else {
                    return false;
                }
            }
        }
        let navigatorConfig = {
            attributes: true,
        }
        let navigatorObserver = new MutationObserver(funcObserver);
        navigatorObserver.observe(manager, navigatorConfig);
    }

    #addNavButton(name, func) {
        let click = document.createElement('div');
        click.classList.add('button');
        click.style.paddingLeft = '10px';
        click.style.paddingBottom = '10px';
        click.style.fontFamily = 'impact';
        click.style.fontSize = '18px';
        click.style.borderBottom = '1px solid black';
        click.innerHTML = name;
        click.addEventListener('click', func);
        this.#verticalNavigation.appendChild(click);
    }
    
}