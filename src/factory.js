

function factory(nm, relativeTo)
{
  return {

    get: function(e, anim)
    {
      if (anim.animating[nm] === false)
      {
        var style = $style( e, nm );
        var converted = $convert( e, style, anim.units[ nm ], relativeTo );

        if ( converted !== false )
        {
          anim.frame[ nm ] = converted;
          anim.animating[ nm  ] = true;
        }
      }
    },
    set: function(e, anim)
    {
      anim.styles[ nm ] = anim.value( nm );
    },
    unset: function(e, anim, attr)
    {
      e.style[ nm ] = null;
    }
  };
}

function factoryDerivable(nm, relativeTo, deriver)
{
  return {

    get: function(e, anim)
    {
      if (anim.animating[nm] === false)
      {
        var style = $style( e, nm );
        var converted = $convert( e, style, anim.units[ nm ], relativeTo );

        if ( converted !== false )
        {
          anim.frame[ nm ] = converted;
          anim.animating[ nm ] = true;
        }
        else if ( isFunction( deriver ) )
        {
          converted = $convert( e, deriver( e ), anim.units[ nm ], relativeTo );

          if ( converted !== false )
          {
            anim.frame[ nm ] = converted;
            anim.animating[ nm ] = true;
          }
        }
      }
    },
    set: function(e, anim)
    {
      anim.styles[ nm ] = anim.value( nm );
    },
    unset: function(e, anim, attr)
    {
      e.style[ nm ] = null;
    }
  };
}

function factoryColor(nm)
{
  return {

    get: function(e, anim)
    {
      if (anim.animating[nm] === false)
      {
        var style = $style( e, nm );
        var parsed = Color.parse( style );

        if (parsed !== false)
        {
          anim.frame[nm] = parsed;
          anim.animating[nm] = true;
        }
      }
    },
    set: function(e, anim)
    {
      anim.styles[ nm ] = Color.format( anim.frame[nm] );
    },
    unset: function(e, anim, attr)
    {
      e.style[ nm ] = null;
    }
  };
}

function factoryNumberAttribute(nm)
{
  return {

    get: function(e, anim)
    {
      if (anim.animating[nm] === false)
      {
        var parsed = parseFloat( e[ nm ] );

        if (isFinite(parsed))
        {
          anim.frame[nm] = parsed;
          anim.animating[nm] = true;
        }
      }
    },
    set: function(e, anim)
    {
      anim.attributes[ nm ] = anim.frame[nm];
    },
    unset: function(e, anim, attr)
    {
      e[ nm ] = null;
    }
  };
}
