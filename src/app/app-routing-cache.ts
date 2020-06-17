import {
  RouteReuseStrategy,
  DefaultUrlSerializer,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';
import { ComponentRef } from '@angular/core';

export class AppRoutingCache implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  private getKey(route: ActivatedRouteSnapshot): string {
    // return this.getKeyTypeA(route);
    // return this.getKeyTypeB(route);
    // return this.getKeyTypeC(route);
    return this.getKeyTypeD(route);
  }

  private getKeyTypeA(route: ActivatedRouteSnapshot): string {
    const state = '_routerState';
    return route[state].url;
  }

  private getKeyTypeB(route: ActivatedRouteSnapshot): string {
    const state = '_routerState';
    const routePath = route.routeConfig.path.replace(/\//g, '_');
    const routeUrl = route[state].url.replace(/\//g, '_');
    return routePath + '_' + routeUrl;
  }

  private getKeyTypeC(route: ActivatedRouteSnapshot): string {
    const state = '_routerState';
    const routePath = route.routeConfig.path.replace(/\//g, '_');
    const routeUrl = route[state].url.replace(/\//g, '_');
    return routeUrl + '_' +  routePath;
  }

  private getKeyTypeD(route: ActivatedRouteSnapshot): string {
    return route.routeConfig.path;
  }

  private removeCacheByKey(route: ActivatedRouteSnapshot): void {
    const state = '_routerState';
    const partOfKey: string = route[state].url.replace(/\//g, '_');
    Object.keys(AppRoutingCache.handlers).map((item) => {
      console.log('removeCacheByKey> item:', item);
      if (item.includes(partOfKey)) {
        const component = AppRoutingCache.handlers[item] as {
          componentRef: ComponentRef<any>;
        };
        if (component) {
          AppRoutingCache.handlers[item] = null;
          delete AppRoutingCache.handlers[item];
          // component.componentRef.destroy();
          console.warn('removeCacheByKey> removed:', item);
        }
      }
    });
  }

  // if return true, will call store.
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getKey(route);
    console.log('shouldDetach> key:',
      key,
      !route.routeConfig,
      '||',
      !!route.routeConfig.loadChildren);
    if (!route.routeConfig || !!route.routeConfig.loadChildren) {
      return false;
    }
    return true;
  }

  // save detached handle into handlers by key.
  public store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    const key = this.getKey(route);
    console.log('store> key:', key, 'handler', AppRoutingCache.handlers,
    '!history.state.shouldNotCache', !history.state.shouldNotCache);
    if (!history.state.shouldNotCache) {
      // if (!handle) {
      //   console.warn('store> skip.');
      //   return; // skip if detached handle is null.
      // }
      AppRoutingCache.handlers[key] = handle;
    } else {
      // this.removeCacheByKey(route);
    }
  }

  // if return true, call retrieve.
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getKey(route);
    const handler = AppRoutingCache.handlers[key];
    console.log('shouldAttach> key:',
      key, !!route.routeConfig,
      '&&',
      !!AppRoutingCache.handlers[key],
      'route:', route.routeConfig,
      'handler:', handler);
    return !!route.routeConfig && !!handler;
  }

  // get detached handle from handler by key.
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

    if (!route.routeConfig || route.routeConfig.loadChildren) {
      const keyNotFound = this.getKey(route);
      console.log('retrieve> keyFailed:', keyNotFound, 'handler', AppRoutingCache.handlers);
      return null;
    }
    const key = this.getKey(route);
    console.log('retrieve> keySuccess:', key, 'handler', AppRoutingCache.handlers);
    return AppRoutingCache.handlers[key];
  }

  // if return true, do nothing. else, trigger the above functions.
  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    console.log('shouldReuseRoute> ',
      future.routeConfig, '->', current.routeConfig,
      future.routeConfig === current.routeConfig,
      '&&',
      JSON.stringify(future.params) === JSON.stringify(current.params));
    return (
      future.routeConfig === current.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(current.params)
    );
  }
}
