const addButton = document.getElementById("addBook");
const bookList = document.getElementById("bookList");

const bookInput = document.getElementById("bookName");
const authorInput = document.getElementById("authorName");

// local storage'dan library anahtarı ile veriyi alır, JSON biçiminden JS nesnesine (diziye) çevirir. Veri yoksa boş dizi oluşturur
const libraryArray = JSON.parse(localStorage.getItem("library")) || [];

renderBooks(); // sayfa yüklendiğinde kitapları render et

addButton.addEventListener("click", () => {
    const bookValue = bookInput.value.trim();
    const authorValue = authorInput.value.trim();

    if (bookValue && authorValue) {
        libraryArray.push({ book: bookValue, author: authorValue });
        updateLocalStorage(); // localStorage güncelle
        renderBooks();

        bookInput.value = "";
        authorInput.value = "";
    } else {
        alert("Lütfen kitap ve yazar ismi girin!");
    }
});

// kitap listesini render etmek için
function renderBooks() {
    bookList.innerHTML = libraryArray.map((book, index) => `
            <li>
              <p class="bookList-p"><b>${book.book}</b> // ${book.author}</p>
              <button class="delete-btn" data-index="${index}">Sil</button>
            </li>
            `).join("");

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteFunc); // her sil butonuna dinleyici ekle
    });
}

// tıklanan butondaki data-index ile hangi kitabın silineceği belirlenir. diziden onu siler.
// splice methodu: dizideki belirtilen index'ten öge eklemek veya çıkarmak için kullanılır.
function deleteFunc(event) {
    const index = event.target.getAttribute("data-index");
    libraryArray.splice(index, 1); // 1 ögeyi çıkardık
    updateLocalStorage();
    renderBooks();
}

// localStorage'ı güncellemek için
function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(libraryArray));
} // diziyi JSON formatında LocalStorage'a kaydeder