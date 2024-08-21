$(document).ready(function() {
    // 初期化処理: ママとパパのタスクカウントを保存する変数
    let momTaskCount = 0;
    let dadTaskCount = 0;

    // ページ読み込み時にローカルストレージからデータをロード
    loadTaskData();

    // タスクを追加するボタンのクリックイベント
    $('#add-task').click(function() {
        // ユーザーが入力したタスクのテキストを取得
        let taskText = $('#task-input').val();
        if (taskText !== '') {
            // タスクをリストに追加する関数を呼び出し
            addTask(taskText);
            // 入力欄をクリア
            $('#task-input').val('');
        }
    });

    // データをリセットするボタンのクリックイベント
    $('#reset-data').click(function() {
        // タスクリストをクリア
        $('#task-list').empty();
        // ママとパパのタスクカウントをリセット
        momTaskCount = 0;
        dadTaskCount = 0;
        updateTaskSummary();
        // ローカルストレージのデータを削除
        localStorage.removeItem('taskData');
    });

    // タスクをリストに追加し、ママとパパの対応済みボタンを作成する関数
    function addTask(text) {
        // タスクのHTML要素を作成
        let taskItem = $('<div class="task-item"></div>').text(text);
        // ママ対応済みボタンを作成
        let momButton = $('<button>ママ対応済み</button>');
        // パパ対応済みボタンを作成
        let dadButton = $('<button>パパ対応済み</button>');

        // ママ対応済みボタンがクリックされたときの処理
        momButton.click(function() {
            // タスクを削除
            $(this).parent().remove();
            // ママのタスクカウントを増やし、表示を更新
            momTaskCount++;
            updateTaskSummary();
            // データを保存
            saveTaskData();
        });

        // パパ対応済みボタンがクリックされたときの処理
        dadButton.click(function() {
            // タスクを削除
            $(this).parent().remove();
            // パパのタスクカウントを増やし、表示を更新
            dadTaskCount++;
            updateTaskSummary();
            // データを保存
            saveTaskData();
        });

        // ボタンをタスクに追加
        taskItem.append(momButton).append(dadButton);
        // タスクリストにタスクを追加
        $('.task-list').append(taskItem);
    }

    // ママとパパのタスク対応数を更新する関数
    function updateTaskSummary() {
        $('#mom-task-count').text(momTaskCount);
        $('#dad-task-count').text(dadTaskCount);
    }

    // タスクデータをlocalStorageに保存する関数
    function saveTaskData() {
        let taskData = {
            momTaskCount: momTaskCount,
            dadTaskCount: dadTaskCount
        };
        // データをJSON形式で保存
        localStorage.setItem('taskData', JSON.stringify(taskData));
    }

    // localStorageからタスクデータを読み込む関数
    function loadTaskData() {
        let storedData = JSON.parse(localStorage.getItem('taskData'));
        if (storedData) {
            // データが存在する場合、カウントを更新
            momTaskCount = storedData.momTaskCount;
            dadTaskCount = storedData.dadTaskCount;
            // タスク対応数の表示を更新
            updateTaskSummary();
        }
    }
});
