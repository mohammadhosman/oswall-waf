function ipToNum(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

function sortIPs(ipArray) {
    return ipArray.sort((a, b) => {
        ipToNum(a.ip) - ipToNum(b.ip);
    })
}

module.exports = { sortIPs};
/* This module provides a function to sort an array of IP addresses in ascending order.
 It converts each IP address to a numeric value and sorts them based on that value. */