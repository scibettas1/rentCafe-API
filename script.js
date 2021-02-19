
$(document).ready(() => {

    $.ajax({
        url: "https://api.rentcafe.com/rentcafeapi.aspx?requestType=floorplan&apiToken=a1599208-f362-437e-a0a5-71d260bcd755&VoyagerPropertyCode=house",
        method: "GET",

    }).then((res) => {
        const aptEl = $("#content")

        var result = JSON.parse(res);
        console.log(result)

        // var beds= aptArray.beds

        var aptArray = result.map((apt) => {

            if (apt.Beds == 0) {
                var beds = "Studio";
            } else {
                var beds = apt.Beds;
            }

            const name = apt.FloorplanName;
            const baths = apt.Baths;
            const sqft = apt.MinimumSQFT + "-" + apt.MaximumSQFT;
            const rent = "$" + apt.MinimumRent + "-$" + apt.MaximumRent;
            const plan = "<img src=https://cdn.rentcafe.com/dmslivecafe/2/70799/" + apt.FloorplanImageName + " class='img-fluid'>";

            const aptLi = "<div class='card shadow p-3 mb-5 bg-white rounded'><div class='row border-bottom'><h1 class='text-center'>" +
                name + "</h1></div><div class='row'><div class='col-md-8'>" + plan + "</div><div class='col-md-4 details'><div class='row'>Beds: " +
                beds + "</div><div class='row'>Baths: " + baths + "</div><div class='row'>SqFt: " +
                sqft + "</div><div class='row'>Rent: " + rent + "</div></div></div></div>";


            //This only displays units if they are available
            const availability = JSON.parse(apt.AvailableUnitsCount)
            //console.log(availability)

            if (availability > 0) {
                aptEl.append(aptLi);
            }

            return {
                name: name,
                beds: beds,
                baths: baths,
                sqft: sqft,
                rent: rent,
                plan: plan,
                availability: availability
            }
        })
        console.log(aptArray)

        const bedrooms = getSelectedCheckboxValues('bedroom');
        console.log(bedrooms);

        function getSelectedCheckboxValues(name) {
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            let values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            return values;
        }

        const btn = document.querySelector('#btn');
        btn.addEventListener('click', (event) => {
            console.log("This is running.")
            

            // if (bedrooms === aptArray.beds) {
            //     aptEl.append(aptLi);
            // }


        });
    });

});