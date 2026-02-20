// Основной объект нашего приложения
const expenseTracker = {
  // Хранилище данных (массив расходов)
  expenses: [],
  
  // Счетчик для уникальных ID
  nextId: 1,

  // 1. Добавление расхода (с проверкой ввода - п.7)
  addExpense(title, amount, category) {
    // Проверка: название и категория не пустые, сумма - число и больше 0
    if (!title || !category || typeof amount !== 'number' || amount <= 0) {
      console.error('Ошибка: Проверьте данные. Название и категория должны быть строками, а сумма - положительным числом.');
      return;
    }

    const newExpense = {
      id: this.nextId,
      title: title,
      amount: amount,
      category: category
    };

    this.expenses.push(newExpense);
    this.nextId++; // Увеличиваем ID для следующего расхода
    console.log(`✅ Расход "${title}" на сумму ${amount} добавлен!`);
  },

  // 2. Вывод всех расходов
  printAllExpenses() {
    console.log('\n--- 📋 Список всех расходов ---');
    if (this.expenses.length === 0) {
      console.log('Список пуст.');
      return;
    }

    this.expenses.forEach(item => {
      console.log(`ID: ${item.id} | ${item.title} | ${item.amount} руб. | Категория: ${item.category}`);
    });
    console.log('-------------------------------\n');
  },

  // 3. Подсчёт общего баланса
  getTotalAmount() {
    let total = 0;
    // Проходим по массиву и суммируем
    this.expenses.forEach(item => {
      total += item.amount;
    });

    // Создаем "чек"
    console.log('\n--- 🧾 ИТОГОВЫЙ ЧЕК ---');
    console.log(`Всего операций: ${this.expenses.length}`);
    console.log(`Общая сумма расходов: ${total} руб.`);
    console.log('---------------------\n');
    
    return total;
  },

  // 4. Фильтрация по категории
  getExpensesByCategory(categoryName) {
    // Фильтруем массив, оставляя только нужную категорию
    const filtered = this.expenses.filter(item => item.category === categoryName);
    
    let categoryTotal = 0;
    filtered.forEach(item => categoryTotal += item.amount);

    console.log(`\n--- 📂 Расходы в категории "${categoryName}" ---`);
    if (filtered.length === 0) {
      console.log('В этой категории расходов нет.');
    } else {
      filtered.forEach(item => {
        console.log(`- ${item.title}: ${item.amount} руб.`);
      });
      console.log(`Итого по категории "${categoryName}": ${categoryTotal} руб.`);
    }
    console.log('------------------------------------------\n');
    
    return filtered;
  },

  // 5. Поиск расхода по названию
  findExpenseByTitle(searchString) {
    // Ищем первый элемент, где название включает строку поиска
    const found = this.expenses.find(item => item.title.toLowerCase().includes(searchString.toLowerCase()));

    if (found) {
      console.log(`\n🔍 Найдено: ID ${found.id} - ${found.title} (${found.amount} руб.)`);
      // Возможность добавить доп. строку (интерпретация требования)
      console.log(`💡 Совет: Вы потратили ${found.amount} на ${found.category}. Стоит ли экономить?`);
      return found;
    } else {
      console.log(`Расход с названием, содержащим "${searchString}", не найден.`);
      return null;
    }
  },

  // 7. Дополнительный функционал: Удаление по ID
  deleteExpense(id) {
    const initialLength = this.expenses.length;
    // Оставляем только те расходы, у которых ID не совпадает с удаляемым
    this.expenses = this.expenses.filter(item => item.id !== id);

    if (this.expenses.length < initialLength) {
      console.log(`🗑️ Расход с ID ${id} успешно удален.`);
    } else {
      console.log(`❌ Расход с ID ${id} не найден.`);
    }
  },

  // 7. Дополнительный функционал: Статистика по категориям
  getCategoryStats() {
    console.log('\n--- 📊 Статистика по категориям ---');
    const stats = {};

    this.expenses.forEach(item => {
      if (!stats[item.category]) {
        stats[item.category] = 0;
      }
      stats[item.category] += item.amount;
    });

    // Выводим результат
    for (const category in stats) {
      console.log(`${category}: ${stats[category]} руб.`);
    }
  }
};


// 1. Добавляем несколько расходов
expenseTracker.addExpense('Обед в кафе', 500, 'Еда');
expenseTracker.addExpense('Такси до дома', 350, 'Транспорт');
expenseTracker.addExpense('Продукты в супермаркете', 1200, 'Еда');
expenseTracker.addExpense('Подписка на музыку', 199, 'Развлечения');

// Пробуем добавить некорректные данные (проверка валидации)
expenseTracker.addExpense('Ошибка', -100, 'Тест'); 
expenseTracker.addExpense('', 500, 'Тест');

// 2. Выводим всё
expenseTracker.printAllExpenses();

// 3. Считаем общую сумму
expenseTracker.getTotalAmount();

// 4. Смотрим категорию "Еда"
expenseTracker.getExpensesByCategory('Еда');

// 5. Ищем расход со словом "Такси"
expenseTracker.findExpenseByTitle('Такси');

// 7. Удаляем расход с ID 2 (Такси)
expenseTracker.deleteExpense(2);

// 7. Смотрим статистику после удаления
expenseTracker.getCategoryStats();

// Финальный список
expenseTracker.printAllExpenses();