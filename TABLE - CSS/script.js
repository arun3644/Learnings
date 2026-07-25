fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const tableBody = document.getElementById("table-body");

    data.forEach(item => {
      const row = document.createElement("div");
      row.classList.add("table-row");

      let rowCells = `
        <div class="table-row-cell checkbox" style="width:4%; display:flex; justify-content:center; align-items:center;">
          <input type="checkbox" class="row-check">
        </div>
      `;

      for (let i in item) {
        if (i === "name") {
          rowCells += `
            <div class="table-row-cell-name name" data-label="Name">
              <img src="${item.name.image}" alt="Profile">
              <span>${item.name.fullName}</span>
            </div>
          `;
        } else {
          rowCells += `
            <div class="table-row-cell ${i}" data-label="${i}">
              ${item[i]}
            </div>
          `;
        }
      }

      rowCells += `
        <div class="table-row-cell action">
          <button class="btn btn-call">
            <img src="./assets/images/sidebars/telephone.png" alt="Action">
          </button>
          <button class="btn btn-call">
            <img src="./assets/images/sidebars/map.png" alt="Action">
          </button>
          <button class="ellipsis-btn btn">⋯
            <div class="dropdown" style="display:none;">
              <div>Update</div>
              <div>Delete</div>
            </div>
          </button>
        </div>
      `;

      row.innerHTML = rowCells;
      tableBody.appendChild(row);

      const ellipsisBtn = row.querySelector(".ellipsis-btn");
      const dropdown = ellipsisBtn.querySelector(".dropdown");

      ellipsisBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", () => {
        dropdown.style.display = "none";
      });
    });

    const headerCheckbox = document.getElementById("select-all");
    const rowChecks = document.querySelectorAll(".row-check");

    headerCheckbox.addEventListener("change", () => {
      rowChecks.forEach(r => r.checked = headerCheckbox.checked);
    });

    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("row-check")) {
        const allChecked = Array.from(rowChecks).every(cb => cb.checked);
        headerCheckbox.checked = allChecked;
      }
    });

    const titleDropdown = document.querySelector(".title-dropdown");
    const dropdownMenu = titleDropdown.querySelector(".dropdown-menu");

    titleDropdown.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });


    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll(".table-row");

      rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(filter)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });


  })
  .catch(err => console.log(err));




