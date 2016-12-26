/**
 * Created by mouni on 22-12-2016.
 */

function loadJSON(callback) {
    var obj = new XMLHttpRequest();
    obj.overrideMimeType("application/json");
    obj.open('GET', 'Data.json', true);
    obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == "200") {
// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(obj.responseText);
        }
    };
    obj.send(null);
}

function loadContacts() {
    //alert("UUUUUUUUUUUUUUUUUUUUUU");
    loadJSON(function (response) {
// Parse JSON string into object
        var json_array = JSON.parse(response);
        console.log(json_array);
        localStorage.setItem("jsonContacts",JSON.stringify(json_array));
        var table = document.getElementById("ContactsFromJson");
        for(var i=0;i<json_array.length;i++)
        {
            var contact = json_array[i];
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var button1 = document.createElement("button");
            button1.setAttribute("class","icon");
            var icon = document.createElement("i");
            icon.setAttribute("class","fa fa-user");

            button1.appendChild(icon);
            td1.appendChild(button1);
            var lab =  document.createElement("label");
            lab.setAttribute("id","Contact"+i);
            lab.innerHTML = contact.mobileno;
            tr.setAttribute("onclick","loadCurrenContact("+contact.mobileno+")");
            td1.appendChild(lab);
            // td1.innerHTML = contact.mobileno;
            tr.appendChild(td1);
            console.log(contact.mobileno);
            table.appendChild(tr);
        }
    });
}
function  loadCurrenContact(contact) {

    alert("here in contact = "+contact);
    var jsonContacts = JSON.parse(localStorage.getItem("jsonContacts"));
    var contactView =document.getElementById("contactsview");

    var contactViewNew =document.createElement("div");
    contactViewNew.id = "contactsview";
    var formContact = document.createElement("form");
    for(var i=0;i<jsonContacts.length;i++)
    {
        var contacts = jsonContacts[i];
        if (contacts.mobileno == contact)
        {
            for(var key in contacts)
            {

                var lab = document.createElement("label");
                lab.setAttribute("for",key);
                var input = document.createElement("INPUT");
                console.log(key);
                if(key == "fname")
                {
                    lab.innerHTML = "First Name : ";
                }
                else if(key == "lname")
                {
                    lab.innerHTML = "Last Name : ";
                }
                else if(key == "email")
                {
                    lab.innerHTML = "Email Id : ";
                }
                else if(key == "mobileno")
                {
                    lab.innerHTML = "Mobile Number : ";
                }
                else if(key == "type")
                {
                    lab.innerHTML = "Type : ";
                }
                else if(key == "address")
                {
                    lab.innerHTML = "Address : ";
                }
                input.setAttribute("id",key);
                input.setAttribute("type","text");
                input.setAttribute("value",contacts[key]);
                var bre = document.createElement("br");
                formContact.appendChild(lab);
                formContact.appendChild(input);
                formContact.appendChild(bre);
            }
        }

    }
    var sub = document.createElement("Input");
    sub.setAttribute("value","Save");
    sub.setAttribute("type","submit");
    formContact.appendChild(sub);
    contactViewNew.appendChild(formContact);
    var parnode = contactView.parentNode;
    parnode.replaceChild(contactViewNew,contactView);
}

// Code for Checkbox

/*

$("input:checkbox:not(:checked)").each(function() {
    var column = "table ." + $(this).attr("name");
    $(column).show();
});

$("input:checkbox").click(function(){
    var column = "table ." + $(this).attr("name");
    $(column).toggle();
});
*/

