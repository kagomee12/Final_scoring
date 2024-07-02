function cekVoucher (voucher, uang) {
    if (voucher == "DumbWaysJos") {
        if (uang >= 50000) {
            let diskon = uang * 0.211;
            let biaya = uang-diskon;
            let kembalian = uang - biaya;
                if (diskon >= 20000 ) {
                    diskon = 20000;
                    biaya = uang-diskon;
                    kembalian = uang - biaya;
                console.log("-uang yang harus dibayar",`${biaya}`,"\n-diskon",`${diskon}`,"\n-kembalian",`${kembalian}`
                );
                }else{
                console.log("-uang yang harus dibayar",`${biaya}`,"\n-diskon",`${diskon}`,"\n-kembalian",`${kembalian}`)
                }
            }else{
                console.log(
                    "uang yang harus dibayar",`${uang}`
                )
            }
    }else if (voucher == "DumbWaysMantap"){
        if (uang >= 80000) {
            let diskon = uang * 0.3;
            let biaya = uang-diskon;
            let kembalian = uang - biaya;
                if (diskon >= 40000 ) {
                    diskon = 240000;
                    biaya = uang-diskon;
                    kembalian = uang - biaya;
                console.log("-uang yang harus dibayar",`${biaya}`,"\n-diskon",`${diskon}`,"\n-kembalian",`${kembalian}`
                );
                }else{
                console.log("-uang yang harus dibayar",`${biaya}`,"\n-diskon",`${diskon}`,"\n-kembalian",`${kembalian}`)
                }
            }else{
                console.log(
                    "uang yang harus dibayar",`${uang}`
                )
    }
}
}