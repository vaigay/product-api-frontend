$(document).ready(function () {

    loadProduct();
    var id;
    currentRow = null;

    $("#ProductForm").click(function () {
        $('#info')[0].reset();
        $('#newProduct').modal('show');
        $('#operation').val('add');
        console.log("alo")
    });


    $('#save').click(function () {
        var formData = new FormData();
        console.log($("#name").val());
        var product = new Object();

        product.name = $("#name").val();
        product.brand = $("#brand").val();;
        product.madein = $("#madein").val();
        product.price = parseFloat($("#price").val());
        product.imageURL =  $("#imageURL").val();
        product.description = $("#description").val();

        console.log(JSON.stringify(product));

        formData.append("name", product.name);
        formData.append("brand", product.brand);
        formData.append("price", product.price);
        formData.append("madein", product.madein);
        formData.append("description", product.description);
        if ($('#image')[0].files[0] != null)
            formData.append("image", $('#image')[0].files[0]);
        else
            formData.append("image", null);
        var url = "http://localhost:8080/product"
        if($('operation').val() == 'add'){
            $.ajax({
                url: "http://localhost:8080/product",
                method: 'POST',
                data: formData,
                headers: {
                    "Authorization": localStorage.getItem('token')
                },
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function (data) {
                    addRowToTable(data);
                },
                error: function () {
                    alert("eror");
                },
                complete: function () {
                    $('#newProduct').modal('hide');
                }
            })
        }
        else{
            formData.append("imageURL", product.imageURL);
            $.ajax({
                url: "http://localhost:8080/product/" + id,
                method: 'PUT',
                data: formData,
                headers: {
                    "Authorization": localStorage.getItem('token')
                },
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("update successfully");
                    // $("#table_data tr").remove();
                    // loadProduct();
                    console.log(JSON.stringify(data));
                    var new_row = productsAdd(data)
                    console.log(new_row);
                    console.log(currentRow);
                    currentRow.replaceWith(new_row);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("eror " + jqXHR.status);
                },
                complete: function () {
                    $('#newProduct').modal('hide');
                }
            })
        }


    })

    function loadProduct() {
        $.ajax({
            url: "http://localhost:8080/products",
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

    function productsAdd(product) {
        var row = "";
        row += '<tr>';
        row += '<td width = "15%"><img alt = "src" src = "http://localhost:8080/img/';
        row += product.imageURL;
        row += '" style = "width:100px"; height:60px"></td>';
        row += '<td>' + product.name + '</td>';
        row += '<td>' + product.brand + '</td>';
        row += '<td>' + product.madein + '</td>';
        row += '<td>' + product.price + '</td>';
        row += '<td>' + product.description + '</td>';
        row += '<td><button value = "' + product.id + '"type="button" class="btn btn-warning edit_product">Edit</button></td>';
        return row;
    }

    function addRowToTable(product) {
        var row = productsAdd(product);
        $("#table_data").append(row);

    }

    $(document).on('click', '.edit_product', function () {
        id  = $(this).attr("value");
        currentRow = $(this).parents('tr');
        loadOneProduct(id);
    });

    function loadOneProduct(id) {
        $.ajax({
            url: "http://localhost:8080/product/" + id,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (data) {
                console.log(data);
                $('#operation').val('update');
                $('#newProduct').modal('show');
                console.log("123");
                $("#name").val(data.name);
                $("#brand").val(data.brand);
                $("#madein").val(data.madein);
                $("#price").val(data.price);
                $("#description").val(data.description);
                $("#imageURL").val(data.imageURL);
               
            }
        });
    }

    
});