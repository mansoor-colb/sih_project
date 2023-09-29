$(document).ready(function () {
    function loaddoctype() {
        $.ajax({
            url: "http://localhost:1223/doctype",
            type: "post",

            dataType: "json",
            success: function (res) {
                if (res.data == 1) {
                    $("#quickdoc").html(`
                    <div class="col-lg-12">
                    <div class="card card-block card-stretch card-transparent ">
                        <div class="card-header d-flex justify-content-between pb-0">
                            <div class="header-title">
                                <h4 class="card-title">Documents</h4>
                            </div>
                            <!-- <div class="card-header-toolbar d-flex align-items-center">
                                <a href="./page-folders.html" class=" view-more">View All</a>
                            </div> -->
                        </div>
                    </div>
                </div>
                    `);
                    // for(let i of res.res){
                    //     $("#quickdoc").append(`
                    //     <div class="col-lg-3 col-md-6 col-sm-6">
                    //     <div class="card card-block card-stretch card-height">
                    //         <div class="card-body image-thumb">
                    //             <a href="docg?type=${i.name}">
                    //                 <div id="quick" doc-id=${i.type_id}  class="mb-4 text-center p-3 rounded iq-thumb">
                    //                     <div class="iq-image-overlay"></div>
                    //                     <img src="../assets/images/layouts/page-1/pdf.png" class="img-fluid" alt="image1">
                    //                 </div>
                    //                 <h6>${i.name}</h6>
                    //             </a>
                    //         </div>
                    //     </div>
                    // </div>
                    //     `)
                    // }

                    for (let i of res.res) {
                        $("#quickdoc").append(`
                        <div class="col-lg-3 col-md-6 col-sm-12" >
                        <div class="template">
                            <a id="SXFVD" data-tippy-content="Select as favorite"></a>
                            <div class="card border-0" id="SXFVD-card" style="transition: transform 0.3s ease-in-out;"onmouseover="this.style.transform='scale(1.1)';" onmouseout="this.style.transform='scale(1.0)';">
                                <a href="docg?type=${i.name}">
                                    <div class="card-body pt-5" id="quick" doc-id=${i.type_id} >
                                        <div class="template-icon mb-4">
                                            <div class="badge-container">
                                                <span class="badge badge-free">Free</span>
                                                 <!-- Add the "Pro" badge here -->
                                            </div> 
                                        </div>
                                        <div class="template-title">
                                            <h6 class="text">${i.name}</h6>
                                        </div>
                                        <div class="template-info">
                                            <p class="fs-13 text-muted mb-2">Generate a ${i.name} based on the provided
                                                 information.</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                        `);
                    }

                    console.log(res.res);
                } else if (res.data == 0) {
                    console.log("Try Later");
                } else {
                    alert("error");
                }
            },
        });
    }
    loaddoctype();

    $("#docsearch").keypress(function (event) {
        $.ajax({
            url: "http://localhost:1223/doctype",
            type: "post",

            dataType: "json",
            success: function (res) {
                $("#docpress").html(``);
                if (res.data == 1) {
                    for (let i of res.res) {
                        $("#docpress").append(`
                        <li><a href="docg?type=${i.name}"><div class="item" id="did" did=${i.type_id}><i class="far fa-file-pdf bg-info"></i>${i.name}</div></a></li>`);
                    }
                } else if (res.data == 0) {
                    $("#docpress").append(
                        ` <li><a href="#"><div class="item" id="did" ><i class="far fa-file-pdf bg-info"></i>Try Later</div></a></li>`
                    );
                    console.log("Try Later");
                } else {
                    alert("error");
                }
            },
        });
    });
});
