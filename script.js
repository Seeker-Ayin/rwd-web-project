// ==============================
// 目前使用測試資料
// 未來可以改成 MySQL API 資料
// ==============================

const chartData = {

    labels: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月"
    ],

    values: [
        120,
        180,
        150,
        220,
        260,
        230,
        300,
        280
    ]

};


// ==============================
// 建立圖表
// ==============================

const canvas =
    document.getElementById("myChart");


const myChart =
    new Chart(canvas, {

        type: "bar",

        data: {

            labels: chartData.labels,

            datasets: [

                {
                    label: "資料數量",

                    data: chartData.values,

                    backgroundColor:
                        "#2563eb",

                    borderRadius: 8
                }

            ]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,


            plugins: {

                legend: {
                    display: true
                }

            },


            scales: {

                y: {

                    beginAtZero: true,

                    title: {

                        display: true,

                        text: "數量"

                    }

                },

                x: {

                    title: {

                        display: true,

                        text: "月份"

                    }

                }

            }

        }

    });


// ==============================
// 未來 MySQL API
// ==============================
//
// 未來可以使用：
//
// fetch("https://你的API網址/api/data")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     });
//
// 注意：GitHub Pages 不直接連 MySQL。
// 應該由後端 API 連 MySQL。
// ==============================
