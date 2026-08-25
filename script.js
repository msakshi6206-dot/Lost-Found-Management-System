let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];

const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const searchInput = document.getElementById("search");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const item = {
        id: Date.now(),
        name: document.getElementById("itemName").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value,
        contact: document.getElementById("contact").value,
        type: document.getElementById("type").value
    };

    items.push(item);

    localStorage.setItem("lostFoundItems", JSON.stringify(items));

    form.reset();

    displayItems();
});

function displayItems(searchText = "") {

    itemList.innerHTML = "";

    const filteredItems = items.filter(function (item) {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
    });

    if (filteredItems.length === 0) {
        itemList.innerHTML = "<p>No items found.</p>";
        return;
    }

    filteredItems.forEach(function (item) {

        const div = document.createElement("div");

        div.className = "item";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Date:</strong> ${item.date}</p>
            <p><strong>Contact:</strong> ${item.contact}</p>

            <button class="delete-btn" onclick="deleteItem(${item.id})">
                Delete
            </button>
        `;

        itemList.appendChild(div);
    });
}

function deleteItem(id) {

    items = items.filter(function (item) {
        return item.id !== id;
    });

    localStorage.setItem("lostFoundItems", JSON.stringify(items));

    displayItems(searchInput.value);
}

searchInput.addEventListener("input", function () {
    displayItems(searchInput.value);
});

displayItems();