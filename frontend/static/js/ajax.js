
const local_url = "http://localhost:8080/api/v1/";


function create_invoice() {
    var amount = $('#totalINR').html();
    var invoice_no = $('#custom_invoice_input').val();
    var invoice_date = $('#invoiceDate').val();
    var due_date = $('#dueDate').val();
    var status = 0;
    var username = $('#username').html();
    var billed_to = $('#billed_to option:selected').val();
    var taxSelect = $('#taxSelect option:selected').val();
    var currency = $('#currency option:selected').val();
    var items=window.localStorage.getItem('items')
    var note=$('#textEditor').html();
    var terms=window.localStorage.getItem('terms')

    
    // alert(billed_to)
    // alert(savrPro)
    // $.ajaxSetup({
    //     headers:{
    //        'Authorization': window.token
    //     }
    //  });
    $.post(local_url + "create_invoice",
        {
            username: username,
            amount: amount,
            invoice_date: invoice_date,
            due_date: due_date,
            invoice_no: invoice_no,
            billed_to: billed_to,
            status:status,
            taxSelect:taxSelect,
            currency:currency,
            items:items,
            note:note,
            terms:terms



        },
        function (data, status) {
            // alert(status);
            console.log("status:",status);
            var resp = JSON.parse(data);
            console.log("resp",resp);
            if (status = 'success') {
                alert("Succesfully!!");
                window.location.href = './template'

            }
            else {
                alert(resp);
            }
        });

}

function add_client() {
    var client = $('#client').val();
    var industry = $('#industry').val();
    var city = $('#city').val();
    var position = $('#Position').val();
    var vat = $('#vat').val();
    var username = $('#username').html();
    var state = $('#state').val();
    var zip = $('#zip').val();
    var steet = $('#steet').val();
    var Nick = $('#Nick').val();
    var Email = $('#Email').val();
    var Key = $('#Key').val();
    var Number = $('#Number').val();
    var s_country = $('#s_country option:selected').val();
    var account_holder = $('#account_h').val();
    var account_no = $('#account_n').val();
    var ifsc = $('#ifsc').val();
    var swift = $('#swift').val();
    var bank = $('#bank').val();
    var gst = $('#gst').val();
    var pan = $('#pan').val();

    alert(account_holder)
    $.post(local_url + "add_client",
        {
            username: username,
            position: position,
            office: city,
            Business_name: client,
            country: s_country,
            state: state,
            street_address: steet,
            business_alias: Nick,
            unique_key: Key,
            number: Number,
            email: Email,
            vat: vat,
            zip: zip,
            industry: industry,
            account_h_name: account_holder,
            account_no: account_no,
            ifsc_code: ifsc,
            swift: swift,
            bank: bank,
            gst: gst,
            pan: pan,
        },
        function (data, status) {
           
            // alert(status);
            console.log(data);
            var resp = JSON.parse(data);
            console.log(resp);
            if (resp.response == 'Invoice detail added!') {
                JSalert("Succesfully!!", "Successfully updated", "success");

            }
            else {
                dangeralert(resp.response);
            }
        });

}


function fetch_client() {

    var billed_to = $('#billed_to option:selected').val();
    $.get(local_url + "client_show",
        {
            Business_name: billed_to,
        },


        function (data) {

            var resp = JSON.parse(data);
            const storedata = resp.response;
            console.log(storedata)
            for (let i = 0; i < storedata.length; i++) {
                detail_data = storedata[i]
            }
            let clientD = document.querySelector('.billed_2').querySelector('.Billed_size').children
     
        
        
            for (const x in clientD) {
                if (x == 0) {
                    if (detail_data.Business_name) {
                        clientD[x].classList.replace('d-none', 'd-flex')
                        clientD[x].lastElementChild.innerText = detail_data.Business_name
                    } else {
                        clientD[x].classList.replace('d-flex', 'd-none')
                    }
                }
        
                if (x == 1) {

                    let val = ''

                    if(detail_data.state){
                        val = detail_data.state
                    }
                    if(detail_data.zip){
                        val = val ?`${val}, ${detail_data.zip}`: detail_data.zip
                    }
                    if(detail_data.country){
                        val = val ?`${val}, ${detail_data.country}`: detail_data.country
                    }
                    if(detail_data.street_address){
                        val = val ?`${val}, ${detail_data.street_address}`: detail_data.street_address
                    }
                    
        
                    if (val) {
                        clientD[x].classList.replace('d-none', 'd-flex')
                        clientD[x].lastElementChild.innerText = val
                    } else {
                        clientD[x].classList.replace('d-flex', 'd-none')
                    }
                }
        
                if (x == 2) {
                    
                    if (detail_data.gst) {
                        clientD[x].classList.replace('d-none', 'd-flex')
                        clientD[x].lastElementChild.innerText = detail_data.gst
                    } else {
                        clientD[x].classList.replace('d-flex', 'd-none')
                    }
                }
        
                if (x == 3) {
                    if (detail_data.pan) {
                        clientD[x].classList.replace('d-none', 'd-flex')
                        clientD[x].lastElementChild.innerText = detail_data.pan
                    } else {
                        clientD[x].classList.replace('d-flex', 'd-none')
                    }
                }
        
                if (x == 4) {
                    if (detail_data.vat) {
                        clientD[x].classList.replace('d-none', 'd-flex')
                        clientD[x].lastElementChild.innerText = detail_data.vat
                    } else {
                        clientD[x].classList.replace('d-flex', 'd-none')
                    }
                }
            }
        

        });

}

function register() {
    var bussiness_name = $('#business_name').val();
    // console.log(bussiness_name)
    var password = $('#password').val();
    var address = $('#address').val();
    var email = $('#email').val();
    var name = $('#name').val();
    var num = $('#num').val();
    var bc = $('#bc').val();

    alert(bussiness_name)
    $.post(local_url + "register",
        {
            bussiness_name: bussiness_name,
            username: name,
            password: password,
            address: address,
            number: num,
            email: email,
            bussiness_category: bc,




        },
        function (data, status) {
            // alert(status);
            console.log(status);
            var resp = JSON.parse(data);
            console.log(resp);
            alert("RUK BC")
            if (status = 'success') {
                alert("Succesfully!!");
                window.location.href = "/";
            }
            else {
                alert(resp.response);
            }
        });

}




function profile() {
    // Retrieve profile data from the form
    var bussiness_name = $('#yourName').val();
    var brand_name = $('#brandName').val();
    var username = $('#username').html();
    var team_size = $('#teamSize').val();
    var website = $('#websiteURL').val();
    var business_date = $('#businessSince').val();
    var business_category = $('#businessCategory').val();

    
    var tagline = $('#businessTagline').val();
    var country = $('#country').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var pincode = $('#postalZip').val();
    var street_address = $('#streetAddress').val();
    var account_h_name = $('#account_name').val();
    var account_no = $('#account_number').val();
    var ifsc_code = $('#IFSC').val();
    var swift = $('#swift').val();
    var bank = $('#bank').val();
    var gst = $('#GST').val();
    var pancard_number = $('#pan').val();


    alert(username)
    // Send a POST request to save the profile data
    $.post(local_url + "profile",
        {
            bussiness_name: bussiness_name,
            brand_name: brand_name,
            team_size: team_size,
            username: username,
            website: website,
            business_date: business_date,
            business_category: business_category,
            tagline: tagline,
            country: country,
            state: state,
            city: city,
            pincode: pincode,
            street_address: street_address,
            account_h_name: account_h_name,
            account_no: account_no,
            ifsc_code: ifsc_code,
            swift: swift,
            bank: bank,
            pancard_number: pancard_number,
            gst: gst,

        },
        function (data, status) {
            console.log(data);
            var resp = JSON.parse(data);
            if (status === 'success') {
                alert("Profile data saved successfully!");
            } else {
                alert(resp.response);
            }
        }
    );
}


function credit() {
    var amount = $('#totalINR').html();
    var creditNo = $('#creditNo').val();

    var invoice_no = $('#link_invoice option:selected').val();
    var credit_date = $('#crediteDate').val();
    var status = 0;
    var username = $('#username').html();
    var billed_to = $('#billed_to option:selected').val();
    var taxSelect = $('#taxSelect option:selected').val();
    var currency = $('#currency option:selected').val();
    var items=window.localStorage.getItem('items')
    var note=$('#textEditor').html();

    console.log(creditNo)
    // alert(billed_to)
    // alert(savrPro)
    // $.ajaxSetup({
    //     headers:{
    //        'Authorization': window.token
    //     }
    //  });
    $.post(local_url + "create_credit",
        {
            username: username,
            amount: amount,
            credit_date: credit_date,
            invoice_no: invoice_no,
            billed_to: billed_to,
            status:status,
            taxSelect:taxSelect,
            currency:currency,
            items:items,
            note:note,
            credit_no:creditNo


        },
        function (data, status) {
            // alert(status);
            console.log(data);
            var resp = JSON.parse(data);
            console.log(resp);
            if (status = 'success') {
                alert("Succesfully!!");

            }
            else {
                alert(resp.response);
            }
        });

}

function upload_photo() {
    var photo = $('.t-amount').html();
 
    $.post(local_url + "upload_image",
        {
            image: photo,
           



        },
        function (data, status) {
            // alert(status);
            console.log(data);
            var resp = JSON.parse(data);
            console.log(resp);
            if (status = 'success') {
                alert("Succesfully!!");

            }
            else {
                alert(resp.response);
            }
        });

}
function upload_image22(){
    var files = document.getElementById("images").files;
            var formData = new FormData();

            for (var i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }
            $.post(local_url + "upload_image",
            {
                image: photo,
               
    
    
    
            },
            function (data, status) {
                // alert(status);
                console.log(data);
                var resp = JSON.parse(data);
                console.log(resp);
                if (status = 'success') {
                    alert("Succesfully!!");
    
                }
                else {
                    alert(resp.response);
                }
            });
}


// function getUserData() {
//     var username = $("#username").html();
//     console.log("imaaagggggggggggggggggggggggggggggggggggggggge",username)
//     $.ajax({
//       url: `${local_url} + "image_path"`, 
//       type: "GET",
//       data: { username: username },
//       success: function(response) {
//         console.log(response)
//         $("#responseContainer").html("Response: " + response);
//       },
//       error: function(error) {
//         console.error("Error fetching data: ", error);
//         $("#responseContainer").html("Error fetching data. Please try again.");
//       }
//     });
//   }


function forget_password() {
    var email = $('#email').val();
    var new_password = $('#new_password').val();


    alert(email)
    $.post(local_url + "for_password",
        {   
            email: email,
            new_password: new_password
        },
        function (data, status) {
            // alert(status);
            console.log(data);
            var resp = JSON.parse(data);
            console.log(resp);
            if (status = 'success') {
                alert('gggggg')
                // window.location.href = '../../Template/forget.html'

            }
            else {
                alert(resp.response);
            }
        });

}




function get_invoice() {

    const username = $('#username').html();
    const invoice_no =$('#invoice_option option:selected').val();

    console.log(invoice_no , username , "boooooothththth")
    $.get(local_url + "get_invoice",
        {
            username: username,
            invoice_no:invoice_no
        },


        function (data , status) {

            if(status == 'success'){
                
            var resp = JSON.parse(data);
            console.log(resp.response[0]);
            window.localStorage.setItem("response",JSON.stringify(resp.response[0]))

            }
            else{
                alert("error")
            }
      

        });

}