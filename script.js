
$(document).ready(() => {

    $.ajax({
        url: "https://api.rentcafe.com/rentcafeapi.aspx?requestType=floorplan&apiToken=a1599208-f362-437e-a0a5-71d260bcd755&VoyagerPropertyCode=house",
        method: "GET",

    }).then((res) => {
        const aptEl = $("#content")

        const result = JSON.parse(res);
        //console.log(result)

        const aptArray = result.map((apt) => {
            
            if (apt.Beds == 0) {
                var beds = "Studio";
            } else {
                var beds = apt.Beds;
            }
            const name = apt.FloorplanName;
            const baths = apt.Baths;
            const sqft = apt.MinimumSQFT + "-" + apt.MaximumSQFT;
            const rent = "$" + apt.MinimumRent + "- $" + apt.MaximumRent;
            const plan = "<img src=https://cdn.rentcafe.com/dmslivecafe/2/70799/" + apt.FloorplanImageName + ">";

            const aptLi = "<div class='row'>" + name + "</div><div class='row'>" + plan + "</div><div class='row'>Beds: " + 
            beds + "</div><div class='row'>Baths: " + baths + "</div><div class='row'>SqFt: " + 
            sqft + "</div><div class='row'>Rent: " + rent + "</div><br /><br />";
            
            aptEl.append(aptLi)

            return {
                name: apt.FloorplanName,
                beds: apt.Beds,
                baths: apt.Baths,
                sqft: apt.MinimumSQFT + "-" + apt.MaximumSQFT,
                rent: "$" + apt.MinimumRent + "- $" + apt.MaximumRent,
                plan: "<img src=https://cdn.rentcafe.com/dmslivecafe/2/70799/" + apt.FloorplanImageName + ">"
            }
        })
        console.log(aptArray)
    });

});