$(document).ready(function () {
    getProductData();
})

function SaveProduct() {
    var url = "/api/Product";
    var objectProduct = {};
    objectProduct.Name = $('#txtProductName').val();
    objectProduct.Price = $('#txtProductPrice').val();
    objectProduct.Quantity = $('#txtProductQuantity').val();
    objectProduct.Active = 1;
    if (objectProduct) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectProduct),
            type: "Post",
            success: function (result) {
                clear();
                //alert(result);
                getProductData();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}  
function clear() {
    $('#txtProductName').val('');
    $('#txtProductPrice').val('');
    $('#txtProductQuantity').val('');
}
function getProductData() {
    var url = "/api/Product";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            //alert(result);
            if (result) {
                $('#tblProductBody').html('');
                var row = '';
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + result[i].Name + "</td>"
                        + "<td>" + result[i].Price + "</td>"
                        + "<td>" + result[i].Quantity + "</td>"
                        + "<td>" + result[i].Active + "</td>"
                        + "<td> <button class = 'btn btn-primary' onclick='DeleteProduct(" + result[i].Id + ")'>Delete</button></td>"
                        /*+"<td> <button class = 'btn btn-primary' >Edit</button></td>"*/
                        + "</tr>";
                }
                if (row != '') {
                    $('#tblProductBody').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
function DeleteProduct(id) {
    var url = "/api/Product/"+id;
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Delete",
            success: function (result) {
                clear();
                alert(result);
                getProductData();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    
}  
//function EditProduct {
//    var url = "/api/Product";
//    $.ajax({
//        url: url,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        type: "Put",
//        success: function (result) {
//            clear();
//            alert(result);
//            getProductData();
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });
//}