$(document).ready(function () {

    loadProduct();

    $("#ProductForm").click(function () {
        $('#info')[0].reset();
        $('#newProduct').modal('show');
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

        console.log(JSON.stringify(product));

        for (i = 0; i < 5; i++) {
            formData.append("name", product.name + i);
            formData.append("brand", product.brand + i);
            formData.append("price", product.price + i);
            formData.append("madein", product.madein + i);
        }

        if ($('#image')[0].files[0] != null)
            formData.append("image", $('#image')[0].files[0]);
        else
            formData.append("image", null);
        console.log(formData.get("product"));
        console.log(formData.get("image"));
        console.log(formData);
        $.ajax({
            url: "http://localhost:8080/api/product",
            method: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function (data) {

                alert(data);
            }
        })
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
        var id = $(this).attr("value");
        loadOneProduct(id);
    });

    function loadOneProduct(id){
        $.ajax({
            url: "http://localhost:8080/product/" + id,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (data) {
                console.log(data);
                
            }
        });
    }
});