$(document).ready(function () {

    loadUser();

    var id;

    

    function loadUser() {
        $.ajax({
            url: "http://localhost:8080/users",
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

    function productsAdd(user) {
        var row = "";
        row += '<tr>';
        row += '<td>' + user.name + '</td>';
        row += '<td>' + user.username + '</td>';
        row += '<td>' + user.phoneNumber + '</td>';
        row += '<td><button value = "' + user.id + '"type="button" class="btn btn-warning view_user">View</button></td>';
        return row;
    }

    function addRowToTable(product) {
        var row = productsAdd(product);
        $("#table_data").append(row);

    }

    $(document).on('click', '.view_user', function () {
        console.log("oke");
        localStorage.setItem("id_user",$(this).attr("value"));
        window.location.href = "userDetail.html";
    });

    
});