
$(document).ready(() => {

    $.ajax({
        //Dey & Bergen API that would be considered proprietary
        url: "https://api.rentcafe.com/rentcafeapi.aspx?requestType=floorplan&apiToken=8a92be8b-6c61-4be5-983d-547c0c68c544&VoyagerPropertyCode=dey",
        //One Ten API that would be considered proprietary
        // url: "https://api.rentcafe.com/rentcafeapi.aspx?requestType=floorplan&apiToken=a1599208-f362-437e-a0a5-71d260bcd755&VoyagerPropertyCode=oneten",
        //Sample API provided in RentCafe's Documentaion
        //url: "https://api.rentcafe.com/rentcafeapi.aspx?requestType=floorplan&apiToken=ODAxNw%3d%3d-0DHk4ex%2bpOU%3d&VoyagerPropertyCode=resca02",
        method: "GET",

    }).then((res) => {
        const aptEl = $("#content");
        const btn = $('#btn');

        const result = JSON.parse(res);
        //console.log(result)

        //Creates a simplfied array with only the info I need
        const aptArray = result.map((apt) => {

            if (apt.Beds == 0) {
                var beds = "Studio";
                var netRent = (Math.round((apt.MaximumRent * 12 - apt.MaximumRent * 4) / 12))
            } else {
                var beds = apt.Beds;
                var netRent = (Math.round((apt.MaximumRent * 26 - apt.MaximumRent * 2) / 26))
            }

            const availability = JSON.parse(apt.AvailableUnitsCount);

            return {
                name: apt.FloorplanName,
                beds: beds,
                baths: apt.Baths,
                sqft: apt.MinimumSQFT + "-" + apt.MaximumSQFT,
                rent: "$" + apt.MinimumRent, //+ "-$" + apt.MaximumRent,
                plan: "<img src=" + apt.FloorplanImageURL + " class='img-fluid'>",
                availability: availability,
                url: apt.AvailabilityURL,
                netRent: "$" + netRent
            }
        });

        //Renders the results to the page

        var renderArray = aptArray.map((apt) => {

            const name = apt.name;
            const beds = apt.beds;
            const baths = apt.baths;
            const sqft = apt.sqft;
            const rent = apt.netRent;
            const plan = apt.plan;
            const availability = apt.availability;
            const url = apt.url;

            const aptLi = "<div class='card shadow p-3 mb-5 bg-white rounded' id='aptLi'><div class='row border-bottom'><h1 class='text-center'>" +
                name + "</h1></div><div class='row'><div class='col-md-8'>" + plan + "</div><div class='col-md-4 details'><div class='row'>Beds: " +
                beds + "</div><div class='row'>Baths: " + baths + "</div><div class='row'>SqFt: " +
                sqft + "</div><div class='row'>Rent: " + rent + "</div><div class='row'><a href=" +
                url + " target='_blank'><button class='float-left btn btn-light'>APPLY NOW</button></a></div></div></div></div>";

            // This only displays units if they are available
            if (availability > 0) {
                aptEl.append(aptLi);
            }
        });

        console.log(aptArray)
        //console.log(aptLi)

        function getSelectedCheckboxValues(name) {
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            let values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            return values;
        }


        btn.on('click', (event) => {
            console.log("This is running.")
            const bedrooms = getSelectedCheckboxValues('bedroom');
            //console.log(bedrooms);

            //This filters and displays units that are checked in the boxes. Work in progress.
            var aptFilter0 = aptArray.filter(apt => apt.beds == bedrooms[0]);
            var aptFilter1 = aptArray.filter(apt => apt.beds == bedrooms[1]);
            var aptFilter2 = aptArray.filter(apt => apt.beds == bedrooms[2]);

            var filterArray = aptFilter0.concat(aptFilter1, aptFilter2);

            for (var i = "0"; i < aptArray.length; i++) {
                $("#aptLi").remove();
            }

            var renderArray = filterArray.map((apt) => {

                const name = apt.name;
                const beds = apt.beds;
                const baths = apt.baths;
                const sqft = apt.sqft;
                const rent = apt.rent;
                const plan = apt.plan;
                const availability = apt.availability;
                const url = apt.url;

                const aptLi = "<div class='card shadow p-3 mb-5 bg-white rounded' id='aptLi'><div class='row border-bottom'><h1 class='text-center'>" +
                    name + "</h1></div><div class='row'><div class='col-md-8'>" + plan + "</div><div class='col-md-4 details'><div class='row'>Beds: " +
                    beds + "</div><div class='row'>Baths: " + baths + "</div><div class='row'>SqFt: " +
                    sqft + "</div><div class='row'>Rent: " + rent + "</div><div class='row'><a href=" +
                    url + " target='_blank'><button class='float-left btn btn-light'>APPLY NOW</button></a></div></div></div></div>";

                // This only displays units if they are available
                if (availability > 0) {
                    aptEl.append(aptLi);
                }
            });
            console.log(filterArray)
        });
    });
});
