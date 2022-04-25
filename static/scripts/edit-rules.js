$(function() {
    // Fix for Bootstrap Datepicker
    $('.rule-builder').on(
        'afterUpdateRuleValue.queryBuilder',
        function(e, rule) {
            if (rule.filter.plugin === 'datepicker') {
                rule.$el.find('.rule-value-container input').datepicker('update');
            }
        },
    );

    /*
    const availableFilters = __earthpoints_rule_filters.map(function(filter) {
        return filter.id;
    });
    const originalRules =
        __earthpoints_querybuilder_state.primaryFilter.rules || [];
    const filteredRules = originalRules.filter((rule) =>
        availableFilters.includes(rule.id),
    );
    const excludedRules = originalRules.filter(
        (rule) => !availableFilters.includes(rule.id),
    );
    
    __earthpoints_querybuilder_state.primaryFilter.rules = filteredRules;
    */

    /*
    $('.rule-builder')
        .first()
        .queryBuilder({
            plugins: ['bt-tooltip-errors'],
            filters: __earthpoints_rule_filters,
            rules: __earthpoints_querybuilder_state.primaryFilter,
            allow_empty: true,
        });
        */

    $('.query-builder').each(function() {
        var rules = $(this).data('qb-rules');
        var filters = $(this).data('qb-filters');
        if ($.isArray(rules) && rules.length == 1) {
            rules = rules[0];
        }

        $(this).queryBuilder({
            plugins: ['bt-tooltip-errors'],
            filters: filters,
            rules: rules,
            allow_empty: true,
        });
    });

    $('#enable-history-filter').change(function() {
        if (this.checked) {
            $('#history-settings').css('display', 'block');


            $('#history-filter-builder').queryBuilder({
                plugins: ['bt-tooltip-errors'],
                filters: __earthpoints_rule_filters,
                condition: 'AND',
                rules: [{
                    /* empty rule */
                    empty: true,
                }, ],
                allow_empty: true,
            });
        } else {
            $('#history-settings').css('display', 'none');
            $('#history-search-builder').queryBuilder('destroy');
            $('#history-filter-builder').queryBuilder('destroy');
        }
    });

    var submit = function() {
        const layers = [];
        $('.query-builder').each(function() {
            var type = $(this).data('type');
            var rules = $(this).queryBuilder('getRules', {
                get_flags: true,
                allow_empty: true,
            });
            if (!rules || !rules.rules.length) {
                return;
            }
            var filters = $(this).data('qb-filters');
            layers.push({
                type: type,
                options: {
                    rules: rules,
                    filters: filters
                }
            })
        })

        /*
        var primaryFilter = $('.rule-builder').queryBuilder('getRules', {
            get_flags: true,
            allow_empty: true,
        });

        var historyQuery = $('#history-search-builder').queryBuilder('getRules', {
            get_flags: true,
            allow_empty: true,
            allow_invalid: true,
        });

        var historyFilters = $('#history-filter-builder').queryBuilder('getRules', {
            get_flags: true,
            allow_empty: true,
            allow_invalid: true,
        });

        // Put excluded rules back
        primaryFilter.rules = primaryFilter.rules.concat(excludedRules);
        
        const result = {
            primaryFilter,
            historyQuery,
            historyFilters,
        };

        */

        document.getElementById('layersJson').value = JSON.stringify(layers);

        /*if (!$.isEmptyObject(result)) {
              alert(JSON.stringify(result, null, 2));
            }*/

        document.getElementById('edit-rule-form').submit();
    };

    $('#rule-template').on('change', submit);

    $('#submit').on('click', function(event) {
        event.preventDefault();
        submit();
    });
});