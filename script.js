// =====================================
// ИГРА «ЗНАТОКИ ИНФОРМАТИКИ»
// =====================================

// 1. ВОПРОСЫ И ТУРЫ

var TOURS = [
    {
        n: "Теоретический",
        ic: "📘",
        t: "Основные понятия информатики",
        q: [
            {
                q: "Что изучает информатика?",
                o: ["Строение живых организмов", "Способы получения, хранения, обработки и передачи информации", "Законы движения тел", "Историю древних государств"],
                c: 1
            },
            {
                q: "Какое устройство используется для ввода текста?",
                o: ["Монитор", "Принтер", "Клавиатура", "Колонки"],
                c: 2
            },
            {
                q: "Что является операционной системой?",
                o: ["Microsoft Word", "Windows", "Google Chrome", "Paint"],
                c: 1
            },
            {
                q: "В каких единицах измеряется объём информации?",
                o: ["Метры и километры", "Литры", "Вольты и амперы", "Биты и байты"],
                c: 3
            },
            {
                q: "Как называется глобальная компьютерная сеть?",
                o: ["Интернет", "Локальная сеть", "Bluetooth", "Телевидение"],
                c: 0
            }
        ]
    },

    {
        n: "Логический",
        ic: "🧩",
        t: "Логика и алгоритмическое мышление",
        q: [
            {
                q: "Продолжи последовательность: 2, 4, 6, 8, …",
                o: ["9", "12", "10", "11"],
                c: 2
            },
            {
                q: "В 4 папках находится по 3 файла. Сколько всего файлов?",
                o: ["7", "12", "15", "10"],
                c: 1
            },
            {
                q: "К числу 7 прибавь 5, затем умножь результат на 2. Что получится?",
                o: ["19", "17", "24", "14"],
                c: 2
            },
            {
                q: "Найди лишнее число: 3, 6, 9, 11, 12.",
                o: ["3", "12", "9", "11"],
                c: 3
            },
            {
                q: "У Маши два брата. У каждого брата есть одна сестра Маша. Сколько детей в семье?",
                o: ["3", "2", "4", "5"],
                c: 0
            }
        ]
    },

    {
        n: "Практический",
        ic: "💻",
        t: "Компьютерные технологии и практические знания",
        q: [
            {
                q: "Какая комбинация клавиш копирует текст?",
                o: ["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"],
                c: 2
            },
            {
                q: "Какая комбинация клавиш вставляет текст?",
                o: ["Ctrl + C", "Ctrl + V", "Ctrl + A", "Ctrl + P"],
                c: 1
            },
            {
                q: "Какой пароль наиболее надёжный?",
                o: ["12345678", "qwerty", "password", "Mira2026!Kz"],
                c: 3
            },
            {
                q: "Какая комбинация клавиш сохраняет документ?",
                o: ["Ctrl + S", "Ctrl + N", "Ctrl + O", "Ctrl + P"],
                c: 0
            },
            {
                q: "Как называется конструкция, которая повторяет команды несколько раз?",
                o: ["Ветвление", "Переменная", "Цикл", "Функция"],
                c: 2
            }
        ]
    }
];


// 2. ОСНОВНЫЕ ПЕРЕМЕННЫЕ

var KEY = "znatoki_v1";
var app = document.getElementById("app");

var S = {
    screen: "home",
    name: "",
    grade: "",
    t: 0,
    i: 0,
    ans: [[], [], []]
};


// 3. СОХРАНЕНИЕ И ЗАГРУЗКА

function save() {
    try {
        localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
        console.log("Ошибка сохранения:", e);
    }
}

function load() {
    try {
        var d = JSON.parse(localStorage.getItem(KEY));

        if (d && d.ans && d.ans.length === 3) {
            return d;
        }
    } catch (e) {
        console.log("Ошибка загрузки:", e);
    }

    return null;
}

function clear() {
    try {
        localStorage.removeItem(KEY);
    } catch (e) {
        console.log("Ошибка очистки:", e);
    }
}


// 4. ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ

function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
}

function score(t) {
    return S.ans[t].filter(function(a, i) {
        return a === TOURS[t].q[i].c;
    }).length;
}

function total() {
    return score(0) + score(1) + score(2);
}

function verdict(p) {
    if (p >= 13) {
        return [
            "Отлично! Ты настоящий знаток информатики!",
            "🏆",
            "Отлично"
        ];
    }

    if (p >= 9) {
        return ["Хороший результат!", "🌟", "Хорошо"];
    }

    if (p >= 5) {
        return ["Неплохо! Продолжай учиться!", "👍", "Удовлетворительно"];
    }

    return ["Попробуй ещё раз!", "💪", "Нужно повторить"];
}


// 5. ПЕРЕХОД МЕЖДУ ЭКРАНАМИ

function go(s) {
    S.screen = s;
    save();
    render();
    window.scrollTo(0, 0);
}

function render() {
    var screens = {
        home: home,
        reg: reg,
        intro: intro,
        quiz: quiz,
        tour: tourEnd,
        final: final
    };

    if (screens[S.screen]) {
        screens[S.screen]();
    } else {
        go("home");
    }
}


// 6. ГЛАВНЫЙ ЭКРАН

function home() {
    var sv = load();

    var can = sv &&
        sv.screen !== "home" &&
        sv.screen !== "reg" &&
        sv.screen !== "final";

    app.innerHTML =
        '<div class="card center">' +
        '<div class="logo">🖥️</div>' +
        '<h1>Знатоки информатики</h1>' +
        '<p class="sub">Проверь свои знания и стань победителем!</p>' +
        '<div class="acts">' +
        '<button class="btn" id="st">🚀 Начать игру</button>' +

        (can
            ? '<button class="btn sec" id="rs">▶ Продолжить: ' + esc(sv.name) + '</button>'
            : '') +

        '</div></div>' +

        '<div class="card" style="margin-top:16px">' +
        '<h2>📜 Правила</h2>' +
        '<ul class="rules">' +
        '<li>В игре 3 тура, в каждом по 5 вопросов — всего 15.</li>' +
        '<li>У каждого вопроса 4 варианта ответа, выбери один.</li>' +
        '<li>Сразу видно, верный ответ или нет. Верный ответ — 1 балл.</li>' +
        '<li>Максимум — 15 баллов. Удачи!</li>' +
        '</ul>' +

        '<div class="tours">' +

        TOURS.map(function(t, i) {
            return '<div class="tour">' +
                '<span>' + t.ic + '</span>' +
                '<b>Тур ' + (i + 1) + '. ' + t.n + '</b>' +
                '<div style="color:var(--mut)">' + t.t + '</div>' +
                '</div>';
        }).join("") +

        '</div></div>';

    document.getElementById("st").onclick = function() {
        go("reg");
    };

    if (can) {
        document.getElementById("rs").onclick = function() {
            S = sv;
            render();
        };
    }
}


// 7. РЕГИСТРАЦИЯ

function reg() {
    app.innerHTML =
        '<div class="card">' +
        '<h2>👤 Регистрация участника</h2>' +
        '<p class="sub">Расскажи, кто играет</p>' +

        '<label for="nm">Имя или название команды</label>' +
        '<input id="nm" maxlength="40" placeholder="Например: Бинарные волки" value="' + esc(S.name) + '">' +

        '<label for="gr">Класс</label>' +
        '<select id="gr">' +
        '<option value="">Выбери класс</option>' +
        '<option>6 класс</option>' +
        '<option>7 класс</option>' +
        '</select>' +

        '<div class="err" id="er"></div>' +

        '<div class="acts">' +
        '<button class="btn sec" id="bk">← Назад</button>' +
        '<button class="btn" id="ct">Продолжить</button>' +
        '</div></div>';

    document.getElementById("gr").value = S.grade;

    document.getElementById("bk").onclick = function() {
        go("home");
    };

    document.getElementById("ct").onclick = function() {
        var n = document.getElementById("nm").value.trim();
        var g = document.getElementById("gr").value;

        if (!n) {
            document.getElementById("er").textContent =
                "Введи имя или название команды";
            return;
        }

        if (!g) {
            document.getElementById("er").textContent =
                "Выбери класс";
            return;
        }

        S = {
            screen: "intro",
            name: n,
            grade: g,
            t: 0,
            i: 0,
            ans: [[], [], []]
        };

        save();
        render();
    };
}


// 8. ВСТУПЛЕНИЕ К ТУРУ

function intro() {
    var t = TOURS[S.t];

    app.innerHTML =
        '<div class="card center">' +
        '<div class="logo">' + t.ic + '</div>' +
        '<div class="sub" style="margin:0">Тур ' + (S.t + 1) + ' из 3</div>' +
        '<h1>' + t.n + '</h1>' +
        '<p class="sub">Тема: ' + t.t + '.<br>5 вопросов — удачи, ' + esc(S.name) + '!</p>' +
        '<div class="acts">' +
        '<button class="btn" id="g">Начать тур</button>' +
        '</div></div>';

    document.getElementById("g").onclick = function() {
        S.i = S.ans[S.t].length;
        go("quiz");
    };
}


// 9. ЭКРАН ВОПРОСОВ

function quiz() {
    var t = TOURS[S.t];
    var q = t.q[S.i];

    var ch = S.ans[S.t][S.i];
    var done = ch !== undefined;

    var L = ["А", "Б", "В", "Г"];

    var pr = (S.t * 5 + S.i + (done ? 1 : 0)) / 15 * 100;

    var h =
        '<div class="card">' +
        '<div class="top">' +
        '<span>' + t.ic + ' Тур ' + (S.t + 1) + '. ' + t.n + '</span>' +
        '<span>Вопрос ' + (S.i + 1) + ' из 5 · Баллы: ' + total() + '</span>' +
        '</div>' +

        '<div class="bar"><i style="width:' + pr + '%"></i></div>' +

        '<p class="q">' + esc(q.q) + '</p>' +
        '<div class="opts">';

    q.o.forEach(function(o, k) {
        var c = "opt";

        if (done) {
            if (k === q.c) {
                c += " ok";
            } else if (k === ch) {
                c += " bad";
            }
        }

        h +=
            '<button class="' + c + '" data-k="' + k + '"' +
            (done ? " disabled" : "") + '>' +
            '<em>' + L[k] + '</em>' +
            '<span>' + esc(o) + '</span>' +
            '</button>';
    });

    h += '</div>';

    if (done) {
        var ok = ch === q.c;

        h +=
            '<div class="fb ' + (ok ? "ok" : "bad") + '">' +
            (ok
                ? "✅ Правильно! +1 балл"
                : "❌ Неверно. Правильный ответ: " + esc(q.o[q.c])) +
            '</div>' +

            '<button class="btn" id="next">Далее →</button>';
    }

    h += '</div>';

    app.innerHTML = h;

    document.querySelectorAll("[data-k]").forEach(function(btn) {
        btn.onclick = function() {
            var k = Number(btn.dataset.k);

            S.ans[S.t][S.i] = k;

            save();
            render();
        };
    });

    var next = document.getElementById("next");

    if (next) {
        next.onclick = function() {
            if (S.i < 4) {
                S.i++;
                go("quiz");
            } else {
                go("tour");
            }
        };
    }
}


// 10. РЕЗУЛЬТАТ ТУРА

function tourEnd() {
    var p = score(S.t);

    app.innerHTML =
        '<div class="card center">' +
        '<div class="logo">🏆</div>' +
        '<h1>Тур завершён!</h1>' +
        '<p class="sub">' + TOURS[S.t].n + '</p>' +
        '<h2>Твой результат: ' + p + ' из 5 баллов</h2>' +

        '<button class="btn" id="nextTour">' +
        (S.t < 2
            ? 'Следующий тур →'
            : 'Посмотреть результат →') +
        '</button>' +

        '</div>';

    document.getElementById("nextTour").onclick = function() {
        if (S.t < 2) {
            S.t++;
            S.i = 0;
            go("intro");
        } else {
            go("final");
        }
    };
}


// 11. ФИНАЛЬНЫЙ РЕЗУЛЬТАТ

function final() {
    var p = total();
    var v = verdict(p);

    app.innerHTML =
        '<div class="card center">' +
        '<div class="logo">' + v[1] + '</div>' +
        '<h1>Игра завершена!</h1>' +
        '<p class="sub">' + esc(S.name) + '</p>' +
        '<h2>Класс: ' + esc(S.grade) + '</h2>' +
        '<h2>Твой результат: ' + p + ' из 15 баллов</h2>' +
        '<h2>' + v[0] + '</h2>' +

        '<button class="btn" id="restart">Играть снова</button>' +
        '</div>';

    document.getElementById("restart").onclick = function() {
        clear();

        S = {
            screen: "home",
            name: "",
            grade: "",
            t: 0,
            i: 0,
            ans: [[], [], []]
        };

        render();
        window.scrollTo(0, 0);
    };
}


// 12. ЗАПУСК ИГРЫ

render();