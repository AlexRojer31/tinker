import { Application } from "/Application.js";

export {Saper};

class Saper {

    #application = new Application('Saper', 'applications/saper/bomb.png');

    constructor() {
        let app = this.#application.getWorkSpace();
        this.#application.render();
        let saper = new WorkSpaceSaper(10, 20, 5, 1);
        saper.main(app);
        
        function WorkSpaceSaper(size_field, size_cell, offset_cells, border_cell) {
            this.cnt = size_field;//10;
            this.size_small = size_cell;//20;
            this.offset_small = offset_cells;//5;
            this.width_border = border_cell;//1;
            //флаг, что натнулся на мину
            this.you_died = false;
            //массив объектов (клеток), каждый из которых включает в себя отдельный div
            this.div_arr = new Array(this.cnt);
            //количество бомб
            this.cnt_bombs = Math.round(this.cnt * this.cnt * 0.1);
            //массив заминированных клеток
            this.div_arr_with_bomb = new Array(this.cnt_bombs);
            //размеры большого дива
            this.width_div_back = (this.size_small * this.cnt) + (this.offset_small * (this.cnt + 1)) + (this.width_border * this.cnt * 2);
            this.height_div_back = (this.size_small * this.cnt) + (this.offset_small * (this.cnt + 1)) + (this.width_border * this.cnt * 2);
            //большой div
            this.div_back = null;

            //ссылки на методы
            let create_background_div_ = create_background_div;
            let create_reload_page_button_ = create_reload_page_button;
            let create_cells_array_ = create_cells_array;
            let arrWithBombsFill_ = arrWithBombsFill;
            let bombingCells_ = bombingCells;
            let evaluate_bombs_around_cells_ = evaluate_bombs_around_cells;

            this.main = function(app) {
                app.innerHTML = '';
                this.div_back = create_background_div_(app, this.width_div_back, this.height_div_back, this.offset_small);
                create_reload_page_button_(app, this.width_div_back, this.height_div_back);
                this.div_arr = create_cells_array_(this.div_back, this.cnt, this.size_small, this.offset_small, this.width_border, this.you_died);
                arrWithBombsFill_(this.div_arr_with_bomb, this.cnt_bombs, this.cnt);
                bombingCells_(this.div_arr, this.div_arr_with_bomb);
                evaluate_bombs_around_cells_(this.div_arr);
            }
            
            function random (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            //заполнение массива заминированных клеток
            function arrWithBombsFill(div_arr_with_bomb, cnt_bombs, cnt) {
                for (let i = 0; i < cnt_bombs; i++) {
                    let tmp = new Array(2);
                    tmp[0] = random(0, (cnt-1) );
                    tmp[1] = random(0, (cnt-1) );
                    div_arr_with_bomb[i] = tmp;
                }
                console.log(div_arr_with_bomb);
            }
            
            //конструктор объекта
            function MyCell(is_push, is_flag, has_bomb_) {
                this.is_pushed = is_push;
                this.is_flagget = is_flag;
                this.has_bomb = has_bomb_;
                this.bombs_around = 0;
                this.bombs_around_color = "Green";
                this.x_coord = 0;
                this.y_coord = 0;
                this.adjCells = new Array(8);//массив соседних ячеек
                this.divObj = null;
            }
            
            //формирование массива соседних ячеек
            function askAdjCells(div_arr, x, y) {
                let myCellObj = div_arr[x][y];
                let cnt = div_arr.length;
            
                if (myCellObj.x_coord >= 1)
                    myCellObj.adjCells[0] = div_arr[myCellObj.x_coord - 1][myCellObj.y_coord];//слева
                else
                    myCellObj.adjCells[0] = null;
            
                if (myCellObj.x_coord < (cnt - 1))
                    myCellObj.adjCells[1] = div_arr[myCellObj.x_coord + 1][myCellObj.y_coord];//справа
                else
                    myCellObj.adjCells[1] = null;
            
                if (myCellObj.y_coord >= 1)
                    myCellObj.adjCells[2] = div_arr[myCellObj.x_coord][myCellObj.y_coord - 1];//снизу
                else
                    myCellObj.adjCells[2] = null;
            
                if (myCellObj.y_coord < (cnt - 1))
                    myCellObj.adjCells[3] = div_arr[myCellObj.x_coord][myCellObj.y_coord + 1];//сверху
                else
                    myCellObj.adjCells[3] = null;
            
                if (myCellObj.x_coord >= 1 && myCellObj.y_coord >= 1)
                    myCellObj.adjCells[4] = div_arr[myCellObj.x_coord - 1][myCellObj.y_coord - 1];//слева снизу
                else
                    myCellObj.adjCells[4] = null;
            
                if (myCellObj.x_coord >= 1 && myCellObj.y_coord < (cnt - 1))
                    myCellObj.adjCells[5] = div_arr[myCellObj.x_coord - 1][myCellObj.y_coord + 1];//слева сверху
                else
                    myCellObj.adjCells[5] = null;
            
                if (myCellObj.x_coord < (cnt - 1) && myCellObj.y_coord >= 1)
                    myCellObj.adjCells[6] = div_arr[myCellObj.x_coord + 1][myCellObj.y_coord - 1];//справа снизу
                else
                    myCellObj.adjCells[6] = null;
            
                if (myCellObj.x_coord < (cnt - 1) && myCellObj.y_coord < (cnt - 1))
                    myCellObj.adjCells[7] = div_arr[myCellObj.x_coord + 1][myCellObj.y_coord + 1];//справа сверху
                else
                    myCellObj.adjCells[7] = null;
            }
            
            //сколько мин находится вокруг текущей myCellObj
            function ask_bombs_around_cell(div_arr, x, y) {
                let myCellObj = div_arr[x][y];
            
                askAdjCells(div_arr, x, y);
            
                for (let i = 0; i < myCellObj.adjCells.length; i++) {
                    if (myCellObj.adjCells[i] != null) {
                        if (myCellObj.adjCells[i].has_bomb == true) {
                            myCellObj.bombs_around += 1;
                        }
                    }
                }
            
                switch (myCellObj.bombs_around) {
                    case 1:
                        myCellObj.bombs_around_color = "Green";
                        break;
                    case 2:
                        myCellObj.bombs_around_color = "Blue";
                        break;
                    case 3:
                        myCellObj.bombs_around_color = "Red";
                        break;
                    case 4:
                        myCellObj.bombs_around_color = "Red";
                        break;
                    case 5:
                        myCellObj.bombs_around_color = "Red";
                        break;
                    case 6:
                        myCellObj.bombs_around_color = "Red";
                        break;
                    case 7:
                        myCellObj.bombs_around_color = "Red";
                        break;
                    case 8:
                        myCellObj.bombs_around_color = "Red";
                        break;
                    default:
                }
            }
            
            //назначение признака что ячейка имеет мину в соответствии с массивом div_arr_with_bomb
            function bombingCells(div_arr, div_arr_with_bomb) {
                for (let i = 0; i < div_arr_with_bomb.length; i++) {
                    div_arr[div_arr_with_bomb[i][0]][div_arr_with_bomb[i][1]].has_bomb = true;
                }
            }
            
            function showCellsWithBomb(div_obj_arr, div_obj, size_cell) {
                for (let x = 0; x < div_obj_arr.length; x++) {
                    for (let y = 0; y < div_obj_arr[x].length; y++) {
                        if (div_obj_arr[x][y] != div_obj) {
                            if (div_obj_arr[x][y].has_bomb == true) {
                                add_pict_in_div(div_obj_arr[x][y].divObj, size_cell, "/applications/saper/bomb.png", "pict_bomb");
                            } else {
                                if (div_obj_arr[x][y].bombs_around != 0) {
                                    div_obj_arr[x][y].divObj.style.color = div_obj_arr[x][y].bombs_around_color;
                                    div_obj_arr[x][y].divObj.textContent = div_obj_arr[x][y].bombs_around;
                                }
                            }
                        }
                    }
                }
            }
            
            //поиск в массиве объекта, который включает в себя див элемент divEl
            function find_obj_by_div(div_obj_arr, divEl) {
                for (let x = 0; x < div_obj_arr.length; x++) {
                    for (let y = 0; y < div_obj_arr.length; y++) {
                        if (divEl.id == div_obj_arr[x][y].divObj.id) {
                            return div_obj_arr[x][y];
                        }
                    }
                }
                return null;
            }
            
            function remove_pict_in_div(divEl, pict_id) {
                let imgsForRemov = divEl.getElementsByTagName("img");
                for (let i = 0; i < imgsForRemov.length; i++) {
                    if (imgsForRemov[i].id == pict_id) {
                        divEl.removeChild(imgsForRemov[i]);
                    }
                }
            }
            
            //удаление картинки из div'ов
            function remove_pict_in_divs(pict_id) {
                let imgsForRemov = document.getElementsByTagName("img");
                let imgsArr = new Array(imgsForRemov.length);
                for (let i = 0; i < imgsArr.length; i++) {
                    imgsArr[i] = imgsForRemov[i];
                }
            
                for (let i = 0; i < imgsArr.length; i++) {
                    if (imgsArr[i].id == pict_id) {
                        imgsArr[i].parentNode.removeChild(imgsArr[i]);
                    }
                }
            }
            
            //добавление картинки в ячейку
            function add_pict_in_div(divEl, size_cell, pictName, pict_id) {
                let img_flag = document.createElement("img");
                img_flag.style.position = "relative";
                img_flag.src = pictName;
                img_flag.style.width = size_cell + "px";
                img_flag.style.height = size_cell + "px";
                img_flag.style.maxWidth = "100%";
                img_flag.style.maxHeight = "100%";
                img_flag.style.zIndex = 100;
                img_flag.id = pict_id;
                divEl.appendChild(img_flag);
            }
            
            //события нажатия левой и правой кнопки мыши на div 
            function msdown(div_obj_arr, you_died, size_cell, event) {
                if (you_died == true) return;
                console.log(event.target);
                let div_obj = find_obj_by_div(div_obj_arr, event.target);
                if (div_obj == null) return;
            
                if (div_obj.is_flagget == false && div_obj.is_pushed == false) {
                    if (event.which == 1) {
                        //alert("pressed left mouse");
                        event.target.style.boxShadow = "inset 1px 1px 5px 1px black";
                        div_obj.is_pushed = true;
            
                        if (div_obj.has_bomb == true) {
                            add_pict_in_div(event.target, size_cell, "/applications/saper/bomb.png", "pict_bomb");
                            alert("you died");
                            you_died = true;
                            remove_pict_in_divs("pict_flag");
                            showCellsWithBomb(div_obj_arr, div_obj, size_cell);
                        } else {
                            if (div_obj.bombs_around > 0 && div_obj.has_bomb == false) {
                                div_obj.divObj.style.color = div_obj.bombs_around_color;
                                div_obj.divObj.textContent = div_obj.bombs_around;
                            }
                        }
                    }
            
                    if (event.which == 3) {
                        //alert("pressed right mouse");
                        add_pict_in_div(event.target, size_cell, "/applications/saper/flag.png", "pict_flag");
                        div_obj.is_flagget = true;
                    }
                }
            }
            
            //наведение мыши и убирание мыши с объекта
            function msover(you_died, event) {
                if (you_died == true) return;
            
                if (event.target.className != "div_small") return "null";
            
                if (event.type == 'mouseover') {
                    event.target.style.background = 'gray';
                }
                if (event.type == 'mouseout') {
                    event.target.style.background = 'silver';
                }
                return "null";
            }
            
            //создание div ячеек
            function div_create(div_obj_arr, div_number_x, div_number_y, size_small, offset_small, width_border, you_died){
                let mydiv = document.createElement("div");
                mydiv.style.position = "relative";
                mydiv.style.width = size_small + "px";
                mydiv.style.height = size_small + "px";
                mydiv.style.marginLeft = offset_small + "px";
                mydiv.style.marginTop = offset_small + "px";
                mydiv.style.borderRadius = size_small*0.25 + "px";
                mydiv.style.background = "silver";
                mydiv.style.border = width_border + "px solid black";
            
                mydiv.style.textAlign = "center";
                mydiv.style.color = "blue";
            
                mydiv.style.boxShadow = "1px 1px 5px 1px black";
                mydiv.className = "div_small";
                mydiv.id = "div_" + div_number_x + "_" + div_number_y;
            
                mydiv.addEventListener("mouseover", msover.bind(null, you_died));
                mydiv.addEventListener("mouseout", msover.bind(null, you_died));
            
                mydiv.addEventListener("mousedown", msdown.bind(null, div_obj_arr, you_died, size_small));
            
                //подавление контекстного меню
                mydiv.addEventListener('contextmenu', stopContext)
                function stopContext() {
                    event.preventDefault();
                }
            
                return mydiv;
            }
            
            //создание фонового блока
            function create_background_div(app, width_div_back, height_div_back, offset_small) {
                let div_back_el = document.createElement("div");
                div_back_el.style.background = "Gainsboro";//"aqua";//"PaleTurquoise";
                div_back_el.style.marginLeft = "auto";
                div_back_el.style.marginRight = "auto";
                div_back_el.style.marginTop = "0";
                div_back_el.style.width = width_div_back + "px";
                div_back_el.style.height = height_div_back + "px";
                div_back_el.style.display = "flex";
                div_back_el.style.flexDirection = "row";
                div_back_el.style.justifyContent = "flex-start";
                div_back_el.style.alignItems = "flex-start";
                div_back_el.style.flexWrap = "wrap";
                div_back_el.style.paddingBottom = offset_small + "px";
                div_back_el.addEventListener('contextmenu', stopContext)
                function stopContext() {
                    event.preventDefault();
                }
                app.appendChild(div_back_el);
                //document.body.appendChild(div_back_el);
                console.log("div_back_el=" + div_back_el);
            
                return div_back_el;
            }
            
            function create_reload_page_button(app, width_div_back, height_div_back) {
                let divBtn = document.createElement("div");
                divBtn.style.marginLeft = "auto";
                divBtn.style.marginRight = "auto";
                divBtn.style.width = width_div_back + "px";
                divBtn.style.height = height_div_back + "px";
                app.appendChild(divBtn);
                //document.body.appendChild(divBtn);
            
                //создание кнопки обновления сраницы
                let reloadBtn = document.createElement("button");
                reloadBtn.textContent = "reload page";
                reloadBtn.style.display = "block";
                reloadBtn.style.marginTop = "10px";
                reloadBtn.style.marginLeft = "auto";
                reloadBtn.style.marginRight = "auto";
                reloadBtn.onclick = reload_page;
                //divBtn.appendChild(reloadBtn);
                divBtn.appendChild(reloadBtn);
                function reload_page() {
                    $.remove(document.body, app.parentElement);
                    let newGame = new WorkSpaceAppCollector();
                    newGame.start('WorkSpaceSaper');
                    //location.reload();//перезагрузка страницы
                    return false;
                }
            }
            
            
            function create_cells_array(div_back, cnt, size_small, offset_small, width_border, you_died) {
                let div_arr = new Array(cnt);
                for (let x = 0; x < cnt; x++) {
                    let tmp_arr_y = new Array(cnt);
                    for (let y = 0; y < cnt; y++) {
                        let div_tmp = div_create(div_arr, x, y, size_small, offset_small, width_border, you_died);
                        let myCl = new MyCell(false, false, false);
                        myCl.divObj = div_tmp;
                        myCl.x_coord = x;
                        myCl.y_coord = y;
                        tmp_arr_y[y] = myCl;
                        div_back.appendChild(tmp_arr_y[y].divObj);
                    }
                    div_arr[x] = tmp_arr_y;
                }
            
                return div_arr;
            }
            
            
            function evaluate_bombs_around_cells(div_arr) {
                for (let x = 0; x < div_arr.length; x++) {
                    for (let y = 0; y < div_arr.length; y++) {
                        ask_bombs_around_cell(div_arr, x, y);
                    }
                }
            }	
            
        }
    }

    render() {

    }

    destroy() {

    }
    
}