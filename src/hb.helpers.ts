export const HandlebarHelpers = {
    foo1() {return 'deneme';},

    foo2() {return 'deneme2';},

    isSelected(value,toCompare) {
        if(value==toCompare) {
            return 'selected';
        }
    }
}