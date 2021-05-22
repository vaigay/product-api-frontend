$(document).ready(function () {

    loadBill();
   
    function loadBill() {
        $.ajax({
            url: "http://localhost:8080/admin/bills", 
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