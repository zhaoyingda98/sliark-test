// 数据列表，直接从JSON文件中提取
const dataList = [
    ["五", "ŋa", "A", "吾", "ŋ'", "a", "ŋ'a", "ngo", "疑", "", "一", "模", "平", "五乎", "吾鼯𪁙𧋋浯䓊㹳珸郚齬鯃娪梧峿"],
    ["五", "ŋa", "B", "1", "ŋ", "aʔ", "ŋaʔ", "ngyoq", "疑", "開", "三", "魚", "上", "魚巨", "語敔圄衙齬鋙"],
    ["五", "ŋa", "B", "1", "sŋ", "aʔ", "sŋaʔ", "siaeq", "心", "開", "三", "麻", "上", "悉姐", "𣬕"],
    ["魚", "ŋa", "A", "穌", "sŋ'", "a", "sŋ'a", "so", "心", "", "一", "模", "平", "素姑", "a酥"],
    ["魚", "ŋa", "B", "a", "ŋ", "a", "ŋa", "ngyo", "疑", "開", "三", "魚", "平", "語居", "魚𩺰漁𩼪䰻䱷䁩"],
    ["梟", "Kew", "B", "1", "ŋ", "a", "qwe", "ngyo", "疑", "開", "三", "魚", "平", "語居", "魚𩺰漁𩼪䰻䱷䁩"]
];

// 原始的搜索功能
function searchData() {
    const input = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (input === "") {
        alert("Please enter a search term.");
        return;
    }

    // 查找匹配项
    const filteredData = dataList.filter(item => item[0] === input);

    if (filteredData.length > 0) {
        displayResults(filteredData);
    } else {
        resultsDiv.innerText = "No matching data found.";
    }
}

// 新的高级搜索功能
function searchAdvanced() {
    const input = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (input === "") {
        alert("Please enter a search term.");
        return;
    }

    // 收集所有匹配第十五个值的列表的第一个值
    const matchingBValues = new Set();
    for (const item of dataList) {
        if (item[14] && item[14].includes(input)) {
            matchingBValues.add(item[0]);
        }
    }

    if (matchingBValues.size > 0) {
        // 查找所有第一个值是 bValue 的列表
        const finalResults = dataList.filter(item => matchingBValues.has(item[0]));
        if (finalResults.length > 0) {
            displayResults(finalResults);
        } else {
            resultsDiv.innerText = "No matching data found.";
        }
    } else {
        resultsDiv.innerText = "No matching data found.";
    }
}

// 用于正则表达式搜索的功能
function searchByRegex() {
    const input = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (input === "") {
        alert("Please enter a search term.");
        return;
    }

    let regex;
    try {
        // 创建正则表达式
        regex = new RegExp(input);
    } catch (e) {
        alert("Invalid regular expression.");
        return;
    }

    // 过滤符合正则表达式的列表
    const filteredData = dataList.filter(item => regex.test(item[1]));

    if (filteredData.length > 0) {
        displayResults(filteredData);
    } else {
        resultsDiv.innerText = "No matching data found.";
    }
}

// 用于显示结果的辅助函数
function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // 固定表头为数字 1 到 15
    const headers = Array.from({ length: 15 }, (_, i) => i + 1);
    headers.forEach(header => {
        const th = document.createElement("th");
        th.innerText = header;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // 填充表格数据
    data.forEach(row => {
        const rowElement = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.innerText = cell;
            rowElement.appendChild(td);
        });
        table.appendChild(rowElement);
    });

    resultsDiv.appendChild(table);
}
