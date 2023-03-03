var nextGreaterElement = function (nums1, nums2) {
    let res = Array(nums1.length).fill(-1);
    nums1.forEach((element, index) => {
        const nth = nums2.indexOf(element);
        for (let j = nth + 1; j < nums2.length; j++) {
            if (nums2[j] > element) {
                res[index] = nums2[j];
                break;
            }
        }
    });
    return res;
};

const res = nextGreaterElement([4, 1, 2], [1, 3, 4, 2]);
console.log(res);