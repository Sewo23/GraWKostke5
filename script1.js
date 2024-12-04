function toggleCategory(id) {
  const categoryList = document.getElementById(id);
  const skillsTitle = document.getElementById(`${id}-skills`);
  const skillsList = skillsTitle.nextElementSibling;

  // Przełączanie widoczności lewej listy
  if (categoryList.style.display === "none" || categoryList.style.display === "") {
    categoryList.style.display = "block";
  } else {
    categoryList.style.display = "none";
  }

  // Przełączanie widoczności prawej listy z dodaniem klasy
  if (skillsTitle.classList.contains("hidden-list")) {
    skillsTitle.classList.remove("hidden-list");
    skillsList.classList.remove("hidden-list");

    // Dodaj klasę do "Programowanie"
    skillsTitle.classList.add('highlight-text');
  } else {
    skillsTitle.classList.add("hidden-list");
    skillsList.classList.add("hidden-list");

    // Usuń klasę z "Programowanie", jeśli ukrywane
    skillsTitle.classList.remove('highlight-text');
  }
}



  
  // Funkcja do dodawania nowych elementów do listy "Czego chcę się nauczyć"
  function addToLearnList(category) {
    const input = document.getElementById(`${category}-input`);
    const list = document.getElementById(`${category}-list`);
    const newValue = input.value.trim();
  
    if (newValue) {
      const li = document.createElement("li");
      li.textContent = newValue;
      list.appendChild(li);
      input.value = ""; // Wyczyść pole tekstowe
    } else {
      alert("Wpisz umiejętność, którą chcesz dodać!");
    }
  }
  

  // Funkcja do załadowania danych z pliku .txt i wstawienia ich do listy
function loadTextFile() {
  const listElement = document.getElementById("sql-learn-list"); // Kontener listy

  // Pobierz dane z pliku .txt
  fetch("data.txt")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      // Podziel tekst na linie i wstaw każdą linię jako element listy
      const lines = data.split("\n");
      lines.forEach(line => {
        if (line.trim()) { // Sprawdź, czy linia nie jest pusta
          const listItem = document.createElement("li");
          listItem.textContent = line.trim(); // Dodaj tekst do elementu
          listItem.classList.add("list-group-item"); // Dodaj klasę, jeśli używasz Bootstrapa
          listElement.appendChild(listItem); // Wstaw element do listy
        }
      });
    })
    .catch(error => {
      console.error("Wystąpił błąd podczas odczytu pliku:", error);
    });
}

// Wywołaj funkcję po załadowaniu strony
document.addEventListener("DOMContentLoaded", loadTextFile);

