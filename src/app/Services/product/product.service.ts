import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exception } from 'sass';
import { environment } from '../../../environments/environment';
import { KeycloakSecurityService } from '../../Keycloak-config/keycloak-security.service';
import { ProductDTO } from '../../Models/product/productAdd-dto';
import { addOrganizationToVersionDTO } from '../../Models/version/add_organization_to_version-dto';
import { VersionDTO } from '../../Models/version/versionAdd-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.API_URL;


  constructor( private http: HttpClient, private KeycloakSecurityService: KeycloakSecurityService) { }


  getAllProducts(organization_id: string){
    try {
      return this.http.get(this.apiUrl+`/organization/${organization_id}/product`);
          } catch (error) {
        throw new Error(error);
      }
  }

  /**
   * get products for a specific service
   * @param organization_id 
   * @param service_id 
   * @returns 
   */
  getProducts(organization_id:string, service_id: string){
    try {
      return this.http.get(this.apiUrl+'/organization/'+organization_id+'/service/'+service_id+'/product');
    } catch (error) {
      throw new Error(error);
    }
  }

  createProduct(organization_id: string, service_id: string, productDto: ProductDTO){
    try {
      return this.http.post(this.apiUrl + `/organization/${organization_id}/service/${service_id}/product`, 
      { 
        service_id: productDto.service_id, //TODO check if we need to ask for service_id or we generate someone automatically..
        name: productDto.name, 
        description: productDto.description,
        organizations: productDto.organizations,
        depends_on: productDto.depends_on
      })      
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteProduct(organization_id: string, service_id: string, product_id: string){
    try {
      return this.http.delete(this.apiUrl + `/organization/${organization_id}/service/${service_id}/product/${product_id}`)
    } catch (error) {
      throw new Error(error);
    }
  }




  getDefault(organization_id: string, service_id: string){
    try {
    return this.http.get(this.apiUrl+'/organization/'+organization_id+'/service/'+service_id+'/product/default');
        } catch (error) {
      throw new Error(error);
    }
  }

  StartService(organization_id: string, service_id: string, snapshot_id: string, mode_id: string) {
    console.log(snapshot_id);
    try {
      return this.http.post(this.apiUrl+'/organization/'+organization_id+'/service/up',
        {
          "mode_id": mode_id,
          "services": [
            {
              "service_id": service_id,
              "snapshot_id": snapshot_id
            }
          ]
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }


  StopService(organization_id: string, service_id: string, mode_id: string) {
    try{
      return this.http.post(this.apiUrl + '/organization/' + organization_id + '/service/down',
        {
          "mode_id": mode_id,
          "services": [
            {
              "service_id": service_id,
            }
          ]
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  GetService(organization_id: string, service_id: string) {
    try {
      return this.http.get(this.apiUrl + '/organization/' + organization_id + '/service/' + service_id);
          
    } catch (error) {
      throw new Error(error);
    }
  }


  /* 
      ########################
      Versions Management
      ########################
  */

      createVersion(organization_id: string, product: any, versionDto: VersionDTO){
        return this.http.post(`${this.apiUrl}/organization/${organization_id}/service/${product.service_id}/product/${product.product_id}/version`,
        { 
          name: versionDto.name,
          description: versionDto.description,
          node_pool: versionDto.node_pool
        })   
      }

      deleteVersion(organization_id: string, product: any, version_id: string){
        try {
          return this.http.delete(`${this.apiUrl}/organization/${organization_id}/service/${product.service_id}/product/${product.product_id}/version/${version_id}`)
        } catch (error) {
          throw new Error(error);
        }
      }

      addOrganizationToVersion(organization_id: string, product: any, version_id: string, addOrgToVersionDto: addOrganizationToVersionDTO){
        return this.http.post(`${this.apiUrl}/organization/${organization_id}/service/${product.service_id}/product/${product.product_id}/version/${version_id}/organization`,
         
          addOrgToVersionDto
        )   
      }

      unassignOrganizationToVersion(organization_id: string, product: any, version_id: string, org_id_to_unassign: string){
        return this.http.delete(`${this.apiUrl}/organization/${organization_id}/service/${product.service_id}/product/${product.product_id}/version/${version_id}/organization/${org_id_to_unassign}`,
        )   
      }
}
