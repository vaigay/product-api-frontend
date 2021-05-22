$(document).ready(function () {

    loadUser();
    loadBill();
   

    function loadUser() {
        var id = localStorage.getItem('id_user');
        $.ajax({
            url: "http://localhost:8080/admin/user/" + id,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (data) {
                console.log(data);
                $('#username').text(data.username);
                $("#name").text(data.name);
                $('#phoneNumber').text(data.phoneNumber);
                console.log(data.username);
                console.log(data.name);
                console.log(data.phoneNumber);
            }
        });
    };

    function loadBill() {
        var id = localStorage.getItem('id_user');
        $.ajax({
            url: "http://localhost:8080/admin/bills/" + id,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (data) {
                console.log(data);
                $.each(data, function (key, value) {
                    addRowToTable(value);
                });
            }
        });
    };

    function billsAdd(bill) {
        var row = "";
        row += '<tr>';
        row += '<td>' + bill.id+ '</td>';
        row += '<td>' + bill.address + '</td>';
        row += '<td>' + bill.totalProductAmount + '</td>';
        row += '<td>' + bill.crateDate + '</td>';
        row += '<td><button value = "' + bill.id + '"type="button" class="btn btn-info bill_detail">Detail</button></td>';
        return row;
    }

    function addRowToTable(bill) {
        var row = billsAdd(bill);
        $("#table_data").append(row);

    }

    $(document).on('click', '.bill_detail', function () {
        id  = $(this).attr("value");
        localStorage.setItem("id_bill",$(this).attr("value"));
        window.location.href = "billDetail.html";
    });

    
});