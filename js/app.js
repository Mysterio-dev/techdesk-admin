(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) {
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        const menuToggle = document.querySelector(".menu__toggle");
        const sidebar = document.querySelector(".projects");
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", (function() {
                const isClosed = sidebar.classList.contains("_open");
                if (isClosed) sidebar.classList.remove("_open"); else sidebar.classList.add("_open");
            }));
            document.addEventListener("click", (function(event) {
                const target = event.target;
                const isMenuToggle = target.closest(".menu__toggle");
                const isSidebar = target.closest(".projects");
                if (!isMenuToggle && !isSidebar) sidebar.classList.remove("_open");
            }));
        }
    }));
    const columnHeaders = document.querySelectorAll(".column-header h2");
    columnHeaders.forEach((header => {
        header.addEventListener("input", updateColumnTitle);
    }));
    function updateColumnTitle(event) {
        const newTitle = event.target.innerText;
        console.log("Новый заголовок:", newTitle);
    }
    const columns = document.querySelectorAll(".column");
    columns.forEach((column => {
        column.addEventListener("dragstart", dragStart);
        column.addEventListener("dragenter", dragEnter);
        column.addEventListener("dragover", dragOver);
        column.addEventListener("dragleave", dragLeave);
        column.addEventListener("drop", drop);
    }));
    let dragColumn = null;
    function dragStart(event) {
        dragColumn = event.target;
        event.target.classList.add("dragging");
    }
    function dragEnter(event) {
        if (event.target !== dragColumn) event.target.classList.add("drag-enter");
    }
    function dragOver(event) {
        event.preventDefault();
    }
    function dragLeave(event) {
        event.target.classList.remove("drag-enter");
    }
    function drop(event) {
        if (event.target !== dragColumn) {
            event.target.classList.remove("drag-enter");
            const dropZone = event.target;
            const columnsContainer = dropZone.parentNode;
            columnsContainer.insertBefore(dragColumn, dropZone.nextSibling);
        }
    }
    const addTaskButtons = document.querySelectorAll(".add-task-button");
    addTaskButtons.forEach((button => {
        button.addEventListener("click", addNewTask);
    }));
    function addNewTask(event) {
        const column = event.target.closest(".column");
        const taskList = column.querySelector(".task-list");
        const newTaskInput = column.querySelector(".new-task-input");
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.innerText = taskText;
            taskList.appendChild(newTask);
            newTaskInput.value = "";
        }
    }
    function autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = "35px";
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.setAttribute("value", textarea.value);
    }
    const textareas = document.querySelectorAll(".task__header-input, .task__create-input");
    textareas.forEach((textarea => {
        textarea.addEventListener("input", autoResizeTextarea);
        textarea.style.height = "35px";
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.setAttribute("value", textarea.value);
    }));
    const task_create_textareas = document.querySelectorAll(".task__create-input");
    task_create_textareas.forEach((function(textarea) {
        function createButton() {
            const addButton = document.createElement("button");
            addButton.classList.add("task__create-add");
            addButton.textContent = "Готово";
            textarea.parentNode.insertBefore(addButton, textarea.nextSibling);
            addButton.addEventListener("click", (function() {
                if (textarea.value.trim() !== "") {
                    console.log("Добавляем задачу:", textarea.value);
                    addTaskCard(textarea.value);
                    textarea.value = "";
                    textarea.parentNode.classList.remove("_active");
                    addButton.remove();
                    checkEmpty();
                    textarea.style.height = "35px";
                }
            }));
        }
        function checkEmpty() {
            const nonEmptyTextareas = Array.from(task_create_textareas).filter((ta => ta.value.trim() !== ""));
            if (nonEmptyTextareas.length === 0) {
                const buttons = document.querySelectorAll(".task__create-add");
                buttons.forEach((button => button.remove()));
            }
        }
        function addTaskCard(text) {
            const taskTodoList = document.querySelector(".task__todolist");
            const taskCard = document.createElement("div");
            taskCard.classList.add("task__card");
            const taskCardBody = document.createElement("div");
            taskCardBody.classList.add("task__card-body");
            const taskControl = document.createElement("div");
            taskControl.classList.add("task__control");
            const taskCheckbox = document.createElement("div");
            taskCheckbox.classList.add("task__checkbox");
            taskCheckbox.addEventListener("click", (function() {
                taskCard.remove();
            }));
            const taskTrigger = document.createElement("button");
            taskTrigger.classList.add("task__trigger");
            const taskTriggerIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            taskTriggerIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            taskTriggerIcon.setAttribute("width", "16");
            taskTriggerIcon.setAttribute("height", "16");
            taskTriggerIcon.setAttribute("fill", "currentColor");
            taskTriggerIcon.setAttribute("class", "bi bi-three-dots");
            taskTriggerIcon.setAttribute("viewBox", "0 0 16 16");
            const taskTriggerIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            taskTriggerIconPath.setAttribute("d", "M3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z");
            taskTriggerIcon.appendChild(taskTriggerIconPath);
            taskTrigger.appendChild(taskTriggerIcon);
            const taskDate = document.createElement("span");
            taskDate.classList.add("task__date");
            const taskCardTitle = document.createElement("div");
            taskCardTitle.classList.add("task__card-title");
            taskCardTitle.textContent = text;
            taskControl.appendChild(taskCheckbox);
            taskControl.appendChild(taskTrigger);
            taskControl.appendChild(taskDate);
            taskCardBody.appendChild(taskControl);
            taskCardBody.appendChild(taskCardTitle);
            taskCard.appendChild(taskCardBody);
            taskTodoList.appendChild(taskCard);
        }
        function updateTextarea() {
            if (textarea.value.trim() !== "") {
                const taskCreate = textarea.closest(".task__create");
                if (!taskCreate.classList.contains("_active")) {
                    taskCreate.classList.add("_active");
                    createButton();
                }
            } else {
                const taskCreate = textarea.closest(".task__create");
                taskCreate.classList.remove("_active");
                const addButton = taskCreate.querySelector(".task__create-add");
                if (addButton) {
                    addButton.remove();
                    checkEmpty();
                }
            }
        }
        textarea.addEventListener("input", updateTextarea);
    }));
    window["FLS"] = true;
    isWebp();
    tabs();
})();